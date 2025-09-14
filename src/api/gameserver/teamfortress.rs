use a2s::{A2SClient, info::ServerOS};
use axum::{
    Json,
    extract::Path,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde::Serialize;

use crate::api::gameserver::{GameServer, GameServerAddress};

#[derive(Debug, Clone)]
pub struct TeamFortress2;
impl GameServer for TeamFortress2 {
    const DEFAULT_PORT: u16 = 27015;
}

pub async fn tf2_query(
    Path(addr): Path<GameServerAddress<TeamFortress2>>,
) -> Result<Response, (StatusCode, &'static str)> {
    use StatusCode as SC;
    let socket = addr.resolve().await.map_err(|e| (SC::BAD_REQUEST, e))?;
    let cl = A2SClient::new()
        .map_err(|_| (SC::INTERNAL_SERVER_ERROR, "Could not initialise A2S query."))?;
    let info = cl
        .info(&socket)
        .map_err(|_| (SC::INTERNAL_SERVER_ERROR, "Could not fetch general info."))?;
    let players = cl
        .players(&socket)
        .map_err(|_| (SC::INTERNAL_SERVER_ERROR, "Could not fetch players info."))?;
    let server = SourceQueryInfo::from((info, players));
    Ok(Json(server).into_response())
}

#[derive(Serialize)]
struct SourceQueryInfo {
    hostname: String,
    map: String,
    server_os: String,
    game_version: String,
    maxplayers: u8,
    players: u8,
    bots: u8,
    vac: bool,
    passworded: bool,
    playerlist: Vec<SourceQueryPlayer>,
}

#[derive(Serialize)]
struct SourceQueryPlayer {
    name: String,
    score: i32,
    duration: f32,
}

impl From<(a2s::info::Info, Vec<a2s::players::Player>)> for SourceQueryInfo {
    fn from((info, players): (a2s::info::Info, Vec<a2s::players::Player>)) -> Self {
        Self {
            hostname: info.name,
            map: info.map,
            server_os: match info.server_os {
                ServerOS::Windows => "Windows",
                ServerOS::Linux => "Linux",
                ServerOS::Mac => "Mac",
            }
            .to_string(),
            game_version: info.version,
            maxplayers: info.max_players,
            players: info.players,
            bots: info.bots,
            vac: info.vac,
            passworded: info.visibility,
            playerlist: players
                .into_iter()
                .map(|p| SourceQueryPlayer {
                    name: p.name,
                    score: p.score,
                    duration: p.duration,
                })
                .collect(),
        }
    }
}
