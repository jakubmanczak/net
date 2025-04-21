use axum::{
    Router,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::get,
};
use sourcequery::source_query;
use splash::{splash, splashes};

pub mod sourcequery;
pub mod splash;

pub fn router() -> Router {
    Router::new()
        .route("/teapot", get(teapot))
        .route("/splash", get(splash))
        .route("/splashes", get(splashes))
        .route("/server-query/source/{socket}", get(source_query))
}

async fn teapot() -> Response {
    StatusCode::IM_A_TEAPOT.into_response()
}
