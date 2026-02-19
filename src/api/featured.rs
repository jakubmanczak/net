use axum::{
    Form,
    http::{HeaderMap, StatusCode},
    response::{IntoResponse, Redirect, Response},
};
use serde::Deserialize;
use uuid::Uuid;

use crate::{
    authcrypto::{AuthError, UserAuthenticate},
    featured::Featured,
    users::User,
};

#[derive(Debug, Deserialize)]
pub struct CreateFeatured {
    category: String,
    title: String,
    url: String,
    desc: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct DeleteFeatured {
    id: String,
}

#[derive(Debug, Deserialize)]
pub struct EditFeatured {
    id: String,
    category: String,
    title: String,
    url: String,
    desc: Option<String>,
}

const REDIRECT: &str = "/dashboard/featureds";

fn redirect_msg(msg: &str) -> Response {
    let msg = msg.replace(' ', "%20");
    Redirect::to(&format!("{REDIRECT}?msg={msg}")).into_response()
}

pub async fn create_form(
    headers: HeaderMap,
    Form(form): Form<CreateFeatured>,
) -> Result<Response, AuthError> {
    let _u = match User::authenticate(&headers)? {
        Some(user) => user,
        None => return Ok((StatusCode::FORBIDDEN, "You are not logged in.").into_response()),
    };

    if form.title.trim().is_empty() {
        return Ok(redirect_msg("Title cannot be empty"));
    }
    if form.url.trim().is_empty() {
        return Ok(redirect_msg("URL cannot be empty"));
    }
    if !Featured::is_valid_category(&form.category) {
        return Ok(redirect_msg("Invalid category"));
    }

    let desc = form
        .desc
        .as_deref()
        .map(|s| s.trim())
        .filter(|s| !s.is_empty());

    match Featured::create(&form.category, form.title.trim(), form.url.trim(), desc) {
        Ok(_) => Ok(redirect_msg("Featured created successfully")),
        Err(_) => Ok(redirect_msg("Failed to create featured")),
    }
}

pub async fn delete_form(
    headers: HeaderMap,
    Form(form): Form<DeleteFeatured>,
) -> Result<Response, AuthError> {
    let _u = match User::authenticate(&headers)? {
        Some(user) => user,
        None => return Ok((StatusCode::FORBIDDEN, "You are not logged in.").into_response()),
    };

    let id = Uuid::parse_str(&form.id);
    let id = match id {
        Ok(id) => id,
        Err(_) => return Ok(redirect_msg("Invalid featured ID")),
    };

    match Featured::delete(&id) {
        Ok(true) => Ok(redirect_msg("Featured deleted")),
        Ok(false) => Ok(redirect_msg("Featured not found")),
        Err(_) => Ok(redirect_msg("Failed to delete featured")),
    }
}

pub async fn edit_form(
    headers: HeaderMap,
    Form(form): Form<EditFeatured>,
) -> Result<Response, AuthError> {
    let _u = match User::authenticate(&headers)? {
        Some(user) => user,
        None => return Ok((StatusCode::FORBIDDEN, "You are not logged in.").into_response()),
    };

    let id = Uuid::parse_str(&form.id);
    let id = match id {
        Ok(id) => id,
        Err(_) => return Ok(redirect_msg("Invalid featured ID")),
    };

    if form.title.trim().is_empty() {
        return Ok(redirect_msg("Title cannot be empty"));
    }
    if form.url.trim().is_empty() {
        return Ok(redirect_msg("URL cannot be empty"));
    }
    if !Featured::is_valid_category(&form.category) {
        return Ok(redirect_msg("Invalid category"));
    }

    let mut featured = match Featured::get_by_id(&id) {
        Ok(Some(f)) => f,
        Ok(None) => return Ok(redirect_msg("Featured not found")),
        Err(_) => return Ok(redirect_msg("Failed to look up featured")),
    };

    let desc = form
        .desc
        .as_deref()
        .map(|s| s.trim())
        .filter(|s| !s.is_empty());

    match featured.update(&form.category, form.title.trim(), form.url.trim(), desc) {
        Ok(_) => Ok(redirect_msg("Featured updated")),
        Err(_) => Ok(redirect_msg("Failed to update featured")),
    }
}
