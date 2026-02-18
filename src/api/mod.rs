use crate::api::{
    gameserver::{minecraft::mc_query, teamfortress::tf2_query},
    reflinks::{getrefcount, getrefroute},
    splash::{splash, splashes, submit_splash},
};
use axum::{
    Router,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::{get, post},
};

pub mod reflinks;

mod auth;
mod gameserver;
mod splash;
mod users;

pub fn router() -> Router {
    Router::new()
        .route("/teapot", get(teapot))
        .route("/auth/login", post(auth::login))
        .route("/auth/login-form", post(auth::login_form))
        .route("/auth/logout", get(auth::logout))
        .route("/auth/logout-form", get(auth::logout_form))
        .route("/self/change-handle-form", post(users::change_handle_form))
        .route("/self/change-passw-form", post(users::change_password_form))
        .route("/splash", get(splash))
        .route("/splashes", get(splashes).post(submit_splash))
        .route("/gameserver/mc/{socket}", get(mc_query))
        .route("/gameserver/tf2/{socket}", get(tf2_query))
        .route("/ref/count", get(getrefcount))
        .route("/ref/{id}", get(getrefroute))
}

async fn teapot() -> Response {
    StatusCode::IM_A_TEAPOT.into_response()
}
