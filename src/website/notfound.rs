use askama::Template;
use axum::{
    http::StatusCode,
    response::{Html, IntoResponse, Response},
};

use crate::website::get_current_year;

#[derive(Template)]
#[template(path = "notfound.html")]
struct WebNotFound {
    current_year: i32,
}

pub async fn web_notfound() -> Response {
    let a = WebNotFound {
        current_year: get_current_year(),
    };
    match a.render() {
        Ok(res) => (StatusCode::NOT_FOUND, Html(res)).into_response(),
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()).into_response(),
    }
}
