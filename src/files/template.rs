use askama::Template;
use axum::{
    http::StatusCode,
    response::{Html, IntoResponse, Response},
};

use crate::{
    files::FilesDirEntry::{self, Dir, File},
    website::get_current_year,
};

#[derive(Template)]
#[template(path = "files.html")]
struct WebFiles<'a> {
    dir_entries: &'a [FilesDirEntry],
    current_dir: String,
    // no_such_file_msg: bool,
    current_year: i32,
}

pub async fn web_files<'a>(dir_entries: &'a [FilesDirEntry], current_dir: String) -> Response {
    let a = WebFiles {
        dir_entries,
        current_dir,
        current_year: get_current_year(),
    };
    match a.render() {
        Ok(res) => (StatusCode::NOT_FOUND, Html(res)).into_response(),
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()).into_response(),
    }
}
