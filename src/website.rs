use axum::{
    http::{Uri, header},
    response::{IntoResponse, Response},
};
use mime_guess::from_path;

use crate::WEBSITE_DIR;

pub async fn website_handler(uri: Uri) -> Response {
    let path = uri.path().trim_start_matches('/');
    let path = if path.is_empty() { "index.html" } else { path };

    match WEBSITE_DIR.get_file(path) {
        Some(file) => {
            let mime = from_path(path).first_or_octet_stream();
            ([(header::CONTENT_TYPE, mime.as_ref())], file.contents()).into_response()
        }
        None => {
            let path = path.to_string() + "/index.html";
            match WEBSITE_DIR.get_file(&path) {
                Some(file) => {
                    let mime = from_path(path).first_or_octet_stream();
                    ([(header::CONTENT_TYPE, mime.as_ref())], file.contents()).into_response()
                }
                None => "not found".into_response(),
            }
        }
    }
}
