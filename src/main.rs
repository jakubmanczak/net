use axum::{
    Router,
    handler::HandlerWithoutStateExt,
    http::{StatusCode, Uri, header},
    response::{IntoResponse, Response},
    routing::get,
};
use include_dir::{Dir, include_dir};
use std::error::Error;
use tokio::net::TcpListener;

const E404: (StatusCode, &str) = (StatusCode::NOT_FOUND, "404 Not Found");
static WEBSITE: Dir = include_dir!("$CARGO_MANIFEST_DIR/web");
const DEFAULT_PORT: u16 = 2004;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    dotenvy::dotenv().ok();
    let port = match std::env::var("PORT") {
        Ok(p) => p.parse::<u16>()?,
        Err(e) => match e {
            std::env::VarError::NotPresent => DEFAULT_PORT,
            _ => return Err(e)?,
        },
    };

    let api = Router::new().route("/", get(())).fallback(E404);

    let r = Router::new()
        .nest("/api/", api)
        .fallback_service(website_handler.into_service());
    let l = TcpListener::bind(format!("0.0.0.0:{port}")).await?;
    println!("Listening on {}", l.local_addr()?);

    axum::serve(l, r).await.unwrap();
    Ok(())
}

async fn website_handler(uri: Uri) -> Response {
    let path = uri.path().trim_start_matches('/');

    let path = if path.is_empty() { "index.html" } else { path };

    match WEBSITE.get_file(path) {
        None => {
            let fallback_lookup = match path.ends_with('/') || path.is_empty() {
                true => format!("{path}index.html"),
                false => format!("{path}.html"),
            };
            match WEBSITE.get_file(fallback_lookup) {
                None => (
                    [(header::CONTENT_TYPE, "text/html")],
                    WEBSITE.get_file("not-found.html").unwrap().contents(),
                )
                    .into_response(),
                Some(file) => {
                    ([(header::CONTENT_TYPE, "text/html")], file.contents()).into_response()
                }
            }
        }
        Some(file) => {
            if path.ends_with(".html") {
                ([(header::CONTENT_TYPE, "text/html")], file.contents()).into_response()
            } else if path.ends_with(".txt") {
                ([(header::CONTENT_TYPE, "text/plain")], file.contents()).into_response()
            } else {
                file.contents().into_response()
            }
        }
    }
}
