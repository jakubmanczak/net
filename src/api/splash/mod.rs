use std::sync::LazyLock;

use axum::{
    Json,
    response::{IntoResponse, Response},
};
use rand::Rng;

const LISTFILE: &str = include_str!("list.txt");
pub static LIST: LazyLock<Vec<&str>> = LazyLock::new(|| LISTFILE.lines().collect());

pub async fn splash() -> Response {
    let list = &*LIST;
    let mut rng = rand::rng();
    list[rng.random_range(0..list.len())].into_response()
}

pub async fn splashes() -> Response {
    Json(&*LIST).into_response()
}
