use crate::api::{
    gameserver::{minecraft::mc_query, teamfortress::tf2_query},
    reflinks::getrefcount,
};
use axum::{
    Router,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::get,
};
use splash::{splash, splashes};

pub mod reflinks;

mod gameserver;
mod splash;

pub fn router() -> Router {
    Router::new()
        .route("/teapot", get(teapot))
        .route("/splash", get(splash))
        .route("/splashes", get(splashes))
        .route("/gameserver/mc/{socket}", get(mc_query))
        .route("/gameserver/tf2/{socket}", get(tf2_query))
        .route("/refcount", get(getrefcount))
}

async fn teapot() -> Response {
    StatusCode::IM_A_TEAPOT.into_response()
}
