use std::convert::Infallible;

use axum::{
    body::Body,
    http::{Request, header},
    response::{IntoResponse, Redirect, Response},
};
use chrono::{Datelike, Utc};
use chrono_tz::Europe::Warsaw;
use maud::{DOCTYPE, Markup, PreEscaped, html};

use crate::{
    embed_assets,
    users::User,
    website::{index::web_index, pages::icons},
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
    if path.ends_with(".html") {
        return Ok(Redirect::permanent(path.trim_end_matches(".html")).into_response());
    }

    match path {
        "index" => return Ok(Redirect::to("/").into_response()),
        "qr" => return Ok(Redirect::to("/qr-encode").into_response()),
        _ => (),
    }

    Ok(match path {
        "" => match web_index().await {
            Ok(r) => r,
            Err(e) => e.into_response(),
        },
        "qr-encode" => pages::qr::page(req.headers()).into_response(),
        "dashboard" => pages::dashboard::page(req.headers()).into_response(),
        "login" => {
            let msg = req
                .uri()
                .query()
                .and_then(|q| q.split('&').find_map(|pair| pair.strip_prefix("msg=")))
                .map(|v| v.replace("%20", " ").replace('+', " "));
            pages::login::page(req.headers(), msg.as_deref()).into_response()
        }

        _ => serve_asset(path).unwrap_or(pages::notfound::page(req.headers()).into_response()),
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

pub fn footer(user: Option<User>) -> Markup {
    html! {
        div class="flex flex-col text-sm max-w-3xl mx-auto w-full text-neutral-500 pt-2 pb-4 mt-auto" {
            hr class="border-neutral-700 mx-3 mb-1";
            div class="flex flex-row-reverse justify-between px-4" {
                p class="text-right" { "Jakub Mańczak © 2019-" (get_current_year()) }
                @if let Some(u) = user {
                    a href="/dashboard" class="hover:underline" {
                        div class="flex justify-center items-center" {
                            div class="*:w-[12px] *:h-[12px] mt-[2px] mr-[2px]" { (PreEscaped(icons::CIRCLE_USER)) }
                            p {(u.handle)}
                        }
                    }
                    // a href="/dashboard" class="hover:underline" { p {"Dashboard"} }
                }
            }
        }
    }
}

pub fn get_current_year() -> i32 {
    Utc::now().with_timezone(&Warsaw).year()
}
