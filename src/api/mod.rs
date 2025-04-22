use axum::{
    Router,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::get,
};
use minecraftquery::minecraft_query;
use sourcequery::source_query;
use splash::{splash, splashes};

mod minecraftquery;
mod sourcequery;
mod splash;

pub fn router() -> Router {
    Router::new()
        .route("/teapot", get(teapot))
        .route("/splash", get(splash))
        .route("/splashes", get(splashes))
        .route("/gameserver/source/{socket}", get(source_query))
        .route("/gameserver/minecraft/{socket}", get(minecraft_query))
}

async fn teapot() -> Response {
    StatusCode::IM_A_TEAPOT.into_response()
}
