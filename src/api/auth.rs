use axum::{
    Form, Json,
    http::{
        HeaderMap, StatusCode, header,
        header::{AUTHORIZATION, COOKIE},
    },
    response::{IntoResponse, Redirect, Response},
};
use rusqlite::{Connection, OptionalExtension};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{
    authcrypto::{AuthError, COOKIE_CLEAR, COOKIE_NAME, check_hashed_password},
    netdb::DB_PATH,
    users::{Session, User},
};

#[derive(Debug, Deserialize)]
pub struct Login {
    uname: String,
    passw: String,
}

#[derive(Debug, Serialize)]
struct LoginResponse {
    token: String,
    session_id: String,
    user: UserResponse,
}

#[derive(Debug, Serialize)]
struct UserResponse {
    id: String,
    handle: String,
}

fn do_login(uname: &str, passw: &str) -> Result<(Session, String), AuthError> {
    let conn = Connection::open(&*DB_PATH)?;
    let res = conn
        .prepare("SELECT id, passhash FROM users WHERE handle = ?1")?
        .query_one([uname], |r| {
            Ok((r.get::<_, String>(0)?, r.get::<_, String>(1)?))
        })
        .optional()?;
    let (userid, passhash) = {
        if let Some((userid, passhash)) = res {
            (userid, passhash)
        } else {
            return Err(AuthError::InvalidCredentials);
        }
    };
    let password_okay = check_hashed_password(passw, &passhash)
        .map_err(|e| AuthError::Argon2Error(e.to_string()))?;
    if !password_okay {
        return Err(AuthError::InvalidCredentials);
    }

    let u = User::get_by_id(
        &Uuid::try_parse(&userid)
            .map_err(|_| AuthError::UserError("Uuid parse fail.".to_string()))?,
    )
    .map_err(|_| AuthError::UserError("DB user get fail.".to_string()))?
    .expect("how the hell");

    let (session, token) = Session::create(u).map_err(|e| AuthError::SessionError(e))?;

    Ok((session, token))
}

pub async fn login(Json(json): Json<Login>) -> Result<Response, AuthError> {
    let (session, token) = do_login(&json.uname, &json.passw)?;

    Ok(Json(LoginResponse {
        token,
        session_id: session.id.to_string(),
        user: UserResponse {
            id: session.user.id.to_string(),
            handle: session.user.handle,
        },
    })
    .into_response())
}

pub async fn login_form(Form(form): Form<Login>) -> Response {
    let (token, redirect_to) = match do_login(&form.uname, &form.passw) {
        Ok((_session, token)) => (Some(token), "/dashboard"),
        Err(e) => {
            let msg = e.msg().replace(' ', "%20");
            return Redirect::to(&format!("/login?msg={msg}")).into_response();
        }
    };

    let secure = match cfg!(debug_assertions) {
        false => "; Secure",
        true => "",
    };
    let cookie = format!(
        "{COOKIE_NAME}={}; Path=/; HttpOnly; SameSite=Lax; Max-Age={}{}",
        token.unwrap(),
        60 * 60 * 24 * 30, // 30 days in seconds
        secure
    );

    ([(header::SET_COOKIE, cookie)], Redirect::to(redirect_to)).into_response()
}

pub async fn logout(headers: HeaderMap) -> Response {
    for token in extract_tokens_from_headers(&headers) {
        if let Ok(Some(mut session)) = Session::get_by_token(&token) {
            let _ = session.revoke();
        }
    }
    ([(header::SET_COOKIE, COOKIE_CLEAR)], StatusCode::OK).into_response()
}

pub async fn logout_form(headers: HeaderMap) -> Result<Response, AuthError> {
    for token in extract_tokens_from_headers(&headers) {
        if let Ok(Some(mut session)) = Session::get_by_token(&token) {
            let _ = session.revoke();
        }
    }
    Ok(([(header::SET_COOKIE, COOKIE_CLEAR)], Redirect::to("/login")).into_response())
}

fn extract_tokens_from_headers(headers: &HeaderMap) -> Vec<String> {
    let mut tokens = Vec::new();

    for header_value in headers.get_all(AUTHORIZATION).iter() {
        if let Ok(s) = header_value.to_str() {
            let s = s.trim();
            if let Some(token) = s.strip_prefix("Bearer ") {
                tokens.push(token.to_string());
            }
        }
    }

    for cookie_header in headers.get_all(COOKIE).iter() {
        if let Ok(cookies) = cookie_header.to_str() {
            for cookie in cookies.split(';') {
                let cookie = cookie.trim();
                if let Some(value) = cookie.strip_prefix(&format!("{}=", COOKIE_NAME)) {
                    tokens.push(value.to_string());
                }
            }
        }
    }

    tokens
}
