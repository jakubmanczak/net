use axum::{Router, handler::HandlerWithoutStateExt, http::StatusCode};
use include_dir::{Dir, include_dir};
use std::error::Error;
use tokio::net::TcpListener;
use website::website_handler;

mod api;
mod website;

const E404: (StatusCode, &str) = (StatusCode::NOT_FOUND, "404 Not Found");
static WEBSITE_DIR: Dir = include_dir!("$CARGO_MANIFEST_DIR/web/public");
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

    let api = api::router().fallback(E404);

    let r = Router::new()
        .nest("/api/", api)
        .fallback_service(website_handler.into_service());
    let l = TcpListener::bind(format!("0.0.0.0:{port}")).await?;
    println!("Listening on {}", l.local_addr()?);

    axum::serve(l, r).await.unwrap();
    Ok(())
}
