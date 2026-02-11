use std::convert::Infallible;

use axum::{
    body::Body,
    http::{Request, header},
    response::{IntoResponse, Response},
};
use chrono::{Datelike, Utc};
use chrono_tz::Europe::Warsaw;
use maud::{DOCTYPE, Markup, html};

use crate::{
    embed_assets,
    website::{
        index::web_index,
        pages::{notfound::web_notfound, qr::web_qr},
    },
};

pub mod embed_macro;
pub mod index;
pub mod pages;

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
        "qr-encode" | "qr-encode.html" => web_qr().into_response(),

        _ => serve_asset(path).unwrap_or(web_notfound().into_response()),
    })
}

pub fn base(title: &str, inner: Markup) -> Markup {
    html! {
        (DOCTYPE)
        head {
            title { (title) }
            meta charset="utf-8";
            link rel="stylesheet" href="/styles.css";
            link rel="icon" type="image/png" href="/icon.png";

            meta name="viewport" content="width=device-width, initial-scale=1.0";
            link rel="preconnect" href="https://fonts.googleapis.com";
            link rel="preconnect" href="https://fonts.gstatic.com" crossorigin;
            link rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Quicksand:wght@300..700&display=swap";
        }
        body class="min-h-screen w-full bg-neutral-900 text-stone-300 font-lora flex flex-col" {
            (inner)
        }
    }
}

pub fn footer() -> Markup {
    html! {
        div class="flex flex-col text-sm max-w-3xl mx-auto w-full text-neutral-500 pt-2 pb-4 mt-auto" {
            hr class="border-neutral-700 mx-3 mb-1";
            p class="px-4 text-right" { "Jakub Mańczak © 2019-" (get_current_year()) }
        }
    }
}

pub fn get_current_year() -> i32 {
    Utc::now().with_timezone(&Warsaw).year()
}
