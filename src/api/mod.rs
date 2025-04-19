use axum::{Router, routing::get};
use splash::{splash, splashes};

pub mod splash;

pub fn router() -> Router {
    Router::new()
        .route("/splash", get(splash))
        .route("/splashes", get(splashes))
}
