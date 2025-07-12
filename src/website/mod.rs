use std::convert::Infallible;

use axum::{
    body::Body,
    http::{Request, StatusCode},
    response::{IntoResponse, Response},
};
use chrono::{Datelike, Utc};
use chrono_tz::Europe::Warsaw;
use tower::ServiceExt;
use tower_http::services::ServeDir;

use crate::website::{index::web_index, notfound::web_notfound};

pub mod index;
pub mod notfound;

const ALLOWED_FILES: &[&str] = &["icon.png", "mow2024.png", "styles.css"];

pub async fn website_service(req: Request<Body>) -> Result<Response, Infallible> {
    let path = req.uri().path().trim_start_matches('/');

    Ok(match path {
        "" | "index" | "index.htsml" => web_index().await,

        _ if ALLOWED_FILES.contains(&path) => match ServeDir::new("web").oneshot(req).await {
            Ok(res) => res.into_response(),
            Err(err) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Something went wrong: {err}"),
            )
                .into_response(),
        },

        _ => web_notfound().await,
    })
}

pub fn get_current_year() -> i32 {
    Utc::now().with_timezone(&Warsaw).year()
}
