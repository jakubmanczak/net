use std::str::FromStr;

use axum::{
    http::{
        HeaderMap, StatusCode,
        header::{AUTHORIZATION, COOKIE},
    },
    response::IntoResponse,
};
use base64::{Engine, prelude::BASE64_STANDARD};
use rusqlite::Connection;
use uuid::Uuid;

use crate::{
    authcrypto::check_hashed_password,
    netdb::DB_PATH,
    users::{Session, User},
};

pub const COOKIE_NAME: &str = "manczaknetauth";
pub const COOKIE_CLEAR: &str = concat!(
    "manczaknetauth",
    "=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"
);

#[derive(thiserror::Error, Debug)]
pub enum AuthError {
    #[error("Invalid credentials")]
    InvalidCredentials,
    #[error("Session error: {0}")]
    SessionError(String),
    #[error("User error: {0}")]
    UserError(String),
    #[error("Invalid authorization header format")]
    InvalidFormat,
    #[error("Invalid base64 encoding")]
    InvalidBase64(#[from] base64::DecodeError),
    #[error("Invalid UTF-8 in credentials")]
    InvalidUtf8(#[from] std::string::FromUtf8Error),
    #[error("Database error: {0}")]
    DatabaseError(#[from] rusqlite::Error),
    #[error("Argon2 error: {0}")]
    Argon2Error(String),
}
impl AuthError {
    pub fn status_code(&self) -> StatusCode {
        use AuthError as AE;
        match self {
            AE::InvalidCredentials => StatusCode::UNAUTHORIZED,
            AE::SessionError(_) | AE::UserError(_) | AE::DatabaseError(_) | AE::Argon2Error(_) => {
                StatusCode::INTERNAL_SERVER_ERROR
            }
            AE::InvalidFormat | AE::InvalidUtf8(_) | AE::InvalidBase64(_) => {
                StatusCode::BAD_REQUEST
            }
        }
    }
    pub fn msg(&self) -> &str {
        use AuthError as AE;
        match self {
            AE::InvalidCredentials => "Your session expired or is incorrect. Try again later.",
            AE::SessionError(_) | AE::UserError(_) | AE::DatabaseError(_) | AE::Argon2Error(_) => {
                "Server error. Contact the webmaster."
            }
            AE::InvalidFormat | AE::InvalidBase64(_) | AE::InvalidUtf8(_) => {
                "Bad login data format. Contact the webmaster."
            }
        }
    }
}

impl IntoResponse for AuthError {
    fn into_response(self) -> axum::response::Response {
        let sc = self.status_code();
        let ms = self.msg().to_string();
        (sc, ms).into_response()
    }
}

enum AuthScheme<'a> {
    Basic(&'a str),
    Bearer(&'a str),
    None,
}

impl<'a> AuthScheme<'a> {
    fn from_header(header: &'a str) -> Self {
        if let Some(credentials) = header
            .strip_prefix("Basic ")
            .or_else(|| header.strip_prefix("basic "))
        {
            AuthScheme::Basic(credentials)
        } else if let Some(token) = header
            .strip_prefix("Bearer ")
            .or_else(|| header.strip_prefix("bearer "))
        {
            AuthScheme::Bearer(token)
        } else {
            AuthScheme::None
        }
    }
}

pub trait UserAuthenticate {
    fn authenticate(headers: &HeaderMap) -> Result<Option<User>, AuthError>;
}

impl UserAuthenticate for User {
    fn authenticate(headers: &HeaderMap) -> Result<Option<User>, AuthError> {
        let mut auth_values = Vec::new();

        for header_value in headers.get_all(AUTHORIZATION).iter() {
            if let Ok(s) = header_value.to_str() {
                auth_values.push(s.to_string());
            }
        }
        for cookie_header in headers.get_all(COOKIE).iter() {
            if let Ok(cookies) = cookie_header.to_str() {
                for cookie in cookies.split(';') {
                    let cookie = cookie.trim();
                    if let Some(value) = cookie.strip_prefix(&format!("{}=", COOKIE_NAME)) {
                        auth_values.push(format!("Bearer {}", value));
                    }
                }
            }
        }

        let mut basic_auth: Option<&str> = None;
        let mut bearer_auth: Option<&str> = None;
        for auth_header in &auth_values {
            let auth_header = auth_header.trim();
            match AuthScheme::from_header(auth_header) {
                AuthScheme::Basic(credentials) => {
                    if basic_auth.is_none() {
                        basic_auth = Some(credentials);
                        break;
                    }
                }
                AuthScheme::Bearer(token) => {
                    if bearer_auth.is_none() {
                        bearer_auth = Some(token);
                    }
                }
                AuthScheme::None => {}
            }
        }

        match (basic_auth, bearer_auth) {
            (Some(credentials), _) => authenticate_basic(credentials),
            (None, Some(token)) => authenticate_bearer(token),
            (None, None) => Ok(None),
        }
    }
}

fn authenticate_basic(credentials: &str) -> Result<Option<User>, AuthError> {
    let decoded = BASE64_STANDARD.decode(credentials)?;
    let credentials_str = String::from_utf8(decoded)?;

    let Some((username, password)) = credentials_str.split_once(':') else {
        return Err(AuthError::InvalidFormat);
    };
    let conn = Connection::open(&*DB_PATH)?;
    let user_result = conn
        .prepare("SELECT id, passhash FROM users WHERE handle = ?1")?
        .query_row([username], |row| {
            Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
        });

    match user_result {
        Ok((id_str, passhash)) => {
            if check_hashed_password(password, &passhash)
                .map_err(|_| AuthError::InvalidCredentials)?
            {
                let user_id = Uuid::from_str(&id_str)
                    .map_err(|_| AuthError::UserError("Uuid parse fail.".to_string()))?;
                let user = User::get_by_id(&user_id)
                    .map_err(|_| AuthError::UserError("Uuid parse fail.".to_string()))?;
                Ok(user)
            } else {
                Err(AuthError::InvalidCredentials)
            }
        }
        Err(rusqlite::Error::QueryReturnedNoRows) => Err(AuthError::InvalidCredentials),
        Err(e) => Err(AuthError::DatabaseError(e)),
    }
}

fn authenticate_bearer(token: &str) -> Result<Option<User>, AuthError> {
    let session = Session::get_by_token(token).map_err(|e| AuthError::SessionError(e))?;

    if let Some(mut s) = session {
        if s.is_expired_or_revoked() {
            return Err(AuthError::InvalidCredentials);
        }
        s.prolong()
            .map_err(|_| AuthError::SessionError("Couldn't prolong session".to_string()))?;
        return Ok(Some(s.user));
    } else {
        return Err(AuthError::InvalidCredentials);
    }
}
