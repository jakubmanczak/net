use axum::{
    extract::Path,
    http::StatusCode,
    response::{IntoResponse, Redirect, Response},
};
use rusqlite::{Connection, OptionalExtension};

use crate::netdb::{DB_PATH, DBERRORMSG};

const NOREF: &str = "No such reference redirect available.";

pub async fn getrefroute(Path(id): Path<String>) -> Response {
    let conn = match Connection::open(&*DB_PATH) {
        Ok(c) => c,
        Err(e) => {
            println!("Couldn't open database while fetching ref #{id}: {e}");
            return (StatusCode::INTERNAL_SERVER_ERROR, DBERRORMSG).into_response();
        }
    };
    let mut statement = match conn.prepare("SELECT destination FROM links WHERE id = ?1") {
        Ok(s) => s,
        Err(e) => {
            println!("Couldn't prepare stmt while fetching ref #{id}: {e}");
            return (StatusCode::INTERNAL_SERVER_ERROR, DBERRORMSG).into_response();
        }
    };
    let query = statement
        .query_one([&id], |row| row.get::<_, String>(0))
        .optional();

    match query {
        Ok(Some(s)) => Redirect::temporary(&s).into_response(),
        Ok(None) => (StatusCode::NOT_FOUND, NOREF).into_response(),
        Err(e) => {
            println!("Error querying database while fetching ref#{id}: {e}");
            (StatusCode::INTERNAL_SERVER_ERROR, DBERRORMSG).into_response()
        }
    }
}

pub async fn getrefcount() -> Response {
    let conn = match Connection::open(&*DB_PATH) {
        Ok(c) => c,
        Err(e) => {
            println!("Couldn't open database while fetching refcount: {e}");
            return (StatusCode::INTERNAL_SERVER_ERROR, DBERRORMSG).into_response();
        }
    };

    let count = conn.query_one("SELECT COUNT(*) FROM links", [], |row| {
        row.get::<_, usize>(0)
    });

    match count {
        Ok(c) => format!("{c}").into_response(),
        Err(e) => {
            println!("Error querying database while fetching refcount: {e}");
            (StatusCode::INTERNAL_SERVER_ERROR, DBERRORMSG).into_response()
        }
    }
}
