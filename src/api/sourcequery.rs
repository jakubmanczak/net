use a2s::{A2SClient, info::ServerOS};
use axum::{
    Json,
    extract::Path,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde::Serialize;

pub async fn source_query(Path(socket): Path<String>) -> Result<Response, SourceQueryError> {
    let cl = A2SClient::new()?;
    let info = cl.info(&socket)?;
    let players = cl.players(&socket)?;
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

pub struct SourceQueryError(a2s::errors::Error);
impl From<a2s::errors::Error> for SourceQueryError {
    fn from(value: a2s::errors::Error) -> Self {
        Self(value)
    }
}

impl IntoResponse for SourceQueryError {
    fn into_response(self) -> Response {
        match self.0 {
            _ => (StatusCode::BAD_REQUEST, self.0.to_string()).into_response(),
        }
    }
}
