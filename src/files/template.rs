use askama::Template;
use axum::{
    http::StatusCode,
    response::{Html, IntoResponse, Response},
};

use crate::files::{
    FilesDirEntry::{self, Dir, File},
    crumb::Crumb,
};

#[derive(Template)]
#[template(path = "files.html")]
pub struct WebFiles<'a> {
    pub dir_entries: &'a [FilesDirEntry],
    pub current_dir: &'a str,
    pub crumbs: &'a [Crumb<'a>],
    pub go_one_up: Option<&'a str>,
    // pub no_such_file_msg: bool,
    pub current_year: i32,
}

pub async fn web_files<'a>(webfiles: WebFiles<'a>) -> Response {
    match webfiles.render() {
        Ok(res) => (StatusCode::OK, Html(res)).into_response(),
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()).into_response(),
    }
}
