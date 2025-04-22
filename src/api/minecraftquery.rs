use axum::{
    Json,
    extract::Path,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde::Serialize;
use std::net::{AddrParseError, SocketAddr};
use thiserror::Error;

pub async fn minecraft_query(Path(socket): Path<String>) -> Result<Response, MinecraftQueryError> {
    let socket = socket.parse::<SocketAddr>()?;
    let status = mc_query::status(socket.ip().to_string().as_str(), socket.port()).await?;
    let info = MinecraftQueryInfo {
        game_version: status.version.name,
        protocol_version: status.version.protocol,
        maxplayers: status.players.max,
        players: status.players.online,
        secure_chat: status.enforces_secure_chat,
    };
    Ok(Json(info).into_response())
}

#[derive(Serialize)]
pub struct MinecraftQueryInfo {
    game_version: String,
    protocol_version: u64,
    maxplayers: u32,
    players: u32,
    secure_chat: Option<bool>,
}

#[derive(Error, Debug)]
pub enum MinecraftQueryError {
    #[error("{0}")]
    AddrParseError(#[from] AddrParseError),
    #[error("{0}")]
    StdIoError(#[from] std::io::Error),
}

impl IntoResponse for MinecraftQueryError {
    fn into_response(self) -> Response {
        use MinecraftQueryError as E;
        match self {
            E::AddrParseError(_) => {
                (StatusCode::BAD_REQUEST, "Could not parse socket address.").into_response()
            }
            E::StdIoError(_) => (StatusCode::BAD_REQUEST, "Standard IO error").into_response(),
        }
    }
}
