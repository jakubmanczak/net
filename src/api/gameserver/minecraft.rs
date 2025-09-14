use axum::{
    Json,
    extract::Path,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde::Serialize;

use crate::api::gameserver::{GameServer, GameServerAddress};

#[derive(Debug, Clone)]
pub struct Minecraft;
impl GameServer for Minecraft {
    const DEFAULT_PORT: u16 = 25565;
    // const IPV6_SUPPORT: bool = true;
    // const SRV_RECORD: Option<&'static str> = Some("_minecraft._tcp");
}

#[derive(Serialize)]
pub struct MinecraftQueryInfo {
    game_version: String,
    protocol_version: u64,
    maxplayers: u32,
    players: u32,
    secure_chat: Option<bool>,
}

pub async fn mc_query(
    Path(addr): Path<GameServerAddress<Minecraft>>,
) -> Result<Response, (StatusCode, &'static str)> {
    use StatusCode as SC;
    let socket = addr.resolve().await.map_err(|e| (SC::BAD_REQUEST, e))?;
    let status = mc_query::status(socket.ip().to_string().as_str(), socket.port())
        .await
        .map_err(|_| (SC::INTERNAL_SERVER_ERROR, "Could not fetch server status."))?;
    Ok(Json(MinecraftQueryInfo {
        game_version: status.version.name,
        protocol_version: status.version.protocol,
        maxplayers: status.players.max,
        players: status.players.online,
        secure_chat: status.enforces_secure_chat,
    })
    .into_response())
}
