use std::convert::Infallible;

use axum::{
    body::Body,
    http::{Request, header},
    response::{IntoResponse, Response},
};
use chrono::{Datelike, Utc};
use chrono_tz::Europe::Warsaw;

use crate::{
    embed_assets,
    website::{index::web_index, notfound::web_notfound, qr::web_qr},
};

pub mod embed_macro;
pub mod index;
pub mod notfound;
pub mod qr;

embed_assets! {
    "icon.png" => "../../web/icon.png" as "image/png",
    "mow2024.png" => "../../web/mow2024.png" as "image/png",
    "styles.css" => "../../web/styles.css" as "text/css",
    "wasm_qr.js" => "../../web/wasm_qr.js" as "application/javascript",
    "wasm_qr_bg.wasm" => "../../web/wasm_qr_bg.wasm" as "application/wasm",
}

pub async fn website_service(req: Request<Body>) -> Result<Response, Infallible> {
    let path = req.uri().path().trim_start_matches('/');

    Ok(match path {
        "" | "index" | "index.html" => match web_index().await {
            Ok(r) => r,
            Err(e) => e.into_response(),
        },
        "qr-encode" | "qr-encode.html" => web_qr().await,

        _ => serve_asset(path).unwrap_or(web_notfound().await),
    })
}

pub fn get_current_year() -> i32 {
    Utc::now().with_timezone(&Warsaw).year()
}
