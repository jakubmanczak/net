use axum::{
    Json,
    http::{HeaderMap, StatusCode, header::AUTHORIZATION},
    response::{IntoResponse, Response},
};
use rusqlite::{Connection, OptionalExtension};
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
        .optional()
        .map_err(|_| (E500, "Could not query splash.".into()))?;
    Ok(chosen.unwrap_or("Splash table is empty!".into()))
}

pub async fn splashes() -> Result<Response, (StatusCode, String)> {
    let conn = Connection::open(&*DB_PATH).map_err(|_| (E500, DBERRORMSG.into()))?;
    let all = conn
        .prepare("SELECT * FROM splashes")
        .map_err(|_| (E500, "Could not prepare database query.".into()))?
        .query_map([], |row| {
            Ok(Splash {
                id: row.get::<_, Uuid>(0)?,
                content: row.get::<_, String>(1)?,
            })
        })
        .map_err(|_| (E500, "Could not query all splash texts.".into()))?
        .collect::<Result<Vec<_>, _>>()
        .map_err(|_| (E500, "Could not collect splash texts.".into()))?;

    let splashes = all;
    Ok(Json(splashes).into_response())
}

pub async fn submit_splash(
    headers: HeaderMap,
    body: String,
) -> Result<Response, (StatusCode, String)> {
    let auth = match headers.get(AUTHORIZATION) {
        Some(auth) => auth
            .to_str()
            .map_err(|_| (StatusCode::BAD_REQUEST, "ASCII only in auth header.".into()))?
            .to_string(),
        None => return Err((StatusCode::UNAUTHORIZED, "".into())),
    };
    if let Some(auth) = auth.strip_prefix("Bearer ") {
        let password = std::env::var("PASSWORD")
            .map_err(|_| (StatusCode::BAD_REQUEST, "Auth off or failed.".into()))?;
        if auth != password {
            return Err((StatusCode::UNAUTHORIZED, "".into()));
        }
    } else {
        return Err((StatusCode::UNAUTHORIZED, "".into()));
    }

    let id = Uuid::now_v7();
    let content = body.trim().to_string();
    if content.is_empty() {
        return Ok((StatusCode::BAD_REQUEST, "Content must be non-empty.").into_response());
    }

    let conn = Connection::open(&*DB_PATH).map_err(|_| (E500, DBERRORMSG.into()))?;
    conn.prepare("INSERT INTO splashes VALUES (?1, ?2)")
        .map_err(|_| (E500, "Could not prepare insertion.".into()))?
        .insert((id, &content))
        .map_err(|_| (E500, "Could not insert splash.".into()))?;

    Ok(Json(Splash { id, content }).into_response())
}
