use std::convert::Infallible;

use axum::{
    body::Body,
    http::Request,
    response::{IntoResponse, Response},
};
use chrono::{Datelike, Utc};
use chrono_tz::Europe::Warsaw;
use tower::ServiceExt;
use tower_http::services::ServeDir;

use crate::website::{index::web_index, notfound::web_notfound, qr::web_qr};

pub mod index;
pub mod notfound;
pub mod qr;

const ALLOWED_FILES: &[&str] = &[
    "icon.png",
    "mow2024.png",
    "styles.css",
    "wasm_qr.js",
    "wasm_qr_bg.wasm",
];

pub async fn website_service(req: Request<Body>) -> Result<Response, Infallible> {
    let path = req.uri().path().trim_start_matches('/');

    Ok(match path {
        "" | "index" | "index.html" => web_index().await,
        "qr-encode" | "qr-encode.html" => web_qr().await,

        _ if ALLOWED_FILES.contains(&path) => ServeDir::new("web")
            .oneshot(req)
            .await
            .unwrap() // Result<T, Infallible> -> just .unwrap()
            .into_response(),
        _ => web_notfound().await,
    })
}

pub fn get_current_year() -> i32 {
    Utc::now().with_timezone(&Warsaw).year()
}
