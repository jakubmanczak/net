use axum::{Router, http::StatusCode, routing::get};
use std::error::Error;
use tokio::net::TcpListener;
use tower::service_fn;

use crate::{files::files_service, tailwind::build_css, website::website_service};

mod api;
mod files;
mod netdb;
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

    netdb::migrations()?;
    let r = Router::new()
        .nest("/api", api::router().fallback(E404))
        .route("/ref/{id}", get(api::reflinks::getrefroute))
        .nest_service("/files", service_fn(files_service))
        .fallback_service(service_fn(website_service));

    let l = TcpListener::bind(format!("0.0.0.0:{port}")).await?;
    println!("Listening on {}", l.local_addr()?);

    axum::serve(l, r).await.unwrap();
    Ok(())
}
