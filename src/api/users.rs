use axum::{
    Form,
    http::{HeaderMap, StatusCode},
    response::{IntoResponse, Redirect, Response},
};
use serde::Deserialize;

use crate::{
    authcrypto::{AuthError, UserAuthenticate},
    users::User,
};

#[derive(Debug, Deserialize)]
pub struct ChangeHandle {
    handle: String,
}

#[derive(Debug, Deserialize)]
pub struct ChangePassword {
    current_password: String,
    new_password: String,
    confirm_password: String,
}

pub async fn change_handle_form(
    headers: HeaderMap,
    Form(form): Form<ChangeHandle>,
) -> Result<Response, AuthError> {
    let mut u = match User::authenticate(&headers)? {
        Some(user) => user,
        None => return Ok((StatusCode::FORBIDDEN, "You are not logged in.").into_response()),
    };

    if form.handle.trim().is_empty() {
        return Ok(
            Redirect::to("/dashboard/user-settings?msg=Handle cannot be empty").into_response(),
        );
    }

    Ok(match u.change_handle(&form.handle) {
        Ok(_) => {
            Redirect::to("/dashboard/user-settings?msg=Handle changed successfully").into_response()
        }
        Err(_) => {
            Redirect::to("/dashboard/user-settings?msg=Failed to change handle").into_response()
        }
    })
}

pub async fn change_password_form(
    headers: HeaderMap,
    Form(form): Form<ChangePassword>,
) -> Result<Response, AuthError> {
    let mut u = match User::authenticate(&headers)? {
        Some(user) => user,
        None => return Ok((StatusCode::FORBIDDEN, "You are not logged in.").into_response()),
    };

    let password_valid = u
        .verify_password(&form.current_password)
        .map_err(|e| AuthError::UserError(e))?;

    if !password_valid {
        return Ok(
            Redirect::to("/dashboard/user-settings?msg=Current password is incorrect")
                .into_response(),
        );
    }

    if form.new_password != form.confirm_password {
        return Ok(
            Redirect::to("/dashboard/user-settings?msg=New passwords do not match").into_response(),
        );
    }

    if form.new_password.is_empty() {
        return Ok(
            Redirect::to("/dashboard/user-settings?msg=New password cannot be empty")
                .into_response(),
        );
    }

    if let Err(_) = u.change_password(&form.new_password) {
        return Ok(
            Redirect::to("/dashboard/user-settings?msg=Failed to change password").into_response(),
        );
    }

    Ok(Redirect::to("/dashboard/user-settings?msg=Password changed successfully").into_response())
}
