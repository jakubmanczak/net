use axum::{Router, http::StatusCode, routing::get};
use std::error::Error;
use tokio::net::TcpListener;
use tower_http::services::{ServeDir, ServeFile};

use crate::{tailwind::build_css, website::index::web_index};

mod api;
mod tailwind;
mod website;

const E404: (StatusCode, &str) = (StatusCode::NOT_FOUND, "404 Not Found");
const DEFAULT_PORT: u16 = 2004;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    dotenvy::dotenv().ok();

    build_css()?;

    let port = match std::env::var("PORT") {
        Ok(p) => p.parse::<u16>()?,
        Err(e) => match e {
            std::env::VarError::NotPresent => DEFAULT_PORT,
            _ => return Err(e)?,
        },
    };

    let api = api::router().fallback(E404);

    let r = Router::new()
        .route("/", get(web_index))
        .nest("/api/", api)
        .fallback_service(
            ServeDir::new("web").not_found_service(ServeFile::new("web/notfound.html")),
        );

    let l = TcpListener::bind(format!("0.0.0.0:{port}")).await?;
    println!("Listening on {}", l.local_addr()?);

    axum::serve(l, r).await.unwrap();
    Ok(())
}
