use std::str::FromStr;

use axum::{
    Json,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use rusqlite::Connection;
use serde::Serialize;
use uuid::Uuid;

use crate::netdb::{DB_PATH, DBERRORMSG};

const E500: StatusCode = StatusCode::INTERNAL_SERVER_ERROR;

#[derive(Debug, Serialize)]
struct Splash {
    id: Uuid,
    content: String,
}

pub async fn splash() -> Result<String, (StatusCode, String)> {
    let conn = Connection::open(&*DB_PATH).map_err(|_| (E500, DBERRORMSG.into()))?;
    let chosen = conn
        .prepare("SELECT content FROM splashes ORDER BY RANDOM() LIMIT 1")
        .map_err(|_| (E500, "Could not prepare database query.".into()))?
        .query_one([], |row| Ok(row.get::<_, String>(0).unwrap()))
        .map_err(|_| (E500, "Could not query splash.".into()))?;
    Ok(chosen)
}

pub async fn splashes() -> Result<Response, (StatusCode, String)> {
    let conn = Connection::open(&*DB_PATH).map_err(|_| (E500, DBERRORMSG.into()))?;
    let all = conn
        .prepare("SELECT * FROM splashes")
        .map_err(|_| (E500, "Could not prepare database query.".into()))?
        .query_map([], |row| {
            Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
        })
        .map_err(|_| (E500, "Could not query all splash texts.".into()))?
        .map(|r| r.unwrap())
        .collect::<Vec<_>>();

    let mut splashes = Vec::new();
    for raw in all {
        splashes.push(Splash {
            id: Uuid::from_str(&raw.0).map_err(|_| (E500, "Couldn't parse Uuid.".into()))?,
            content: raw.1,
        });
    }
    Ok(Json(splashes).into_response())
}
