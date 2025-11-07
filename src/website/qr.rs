use askama::Template;
use axum::{
    http::StatusCode,
    response::{Html, IntoResponse, Response},
};

use crate::website::get_current_year;

#[derive(Template)]
#[template(path = "qr.html")]
struct WebIndex {
    current_year: i32,
}

pub async fn web_qr() -> Response {
    let a = WebIndex {
        current_year: get_current_year(),
    };
    match a.render() {
        Ok(res) => (StatusCode::OK, Html(res)).into_response(),
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()).into_response(),
    }
}
