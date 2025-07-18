use std::convert::Infallible;

use axum::{
    body::Body,
    http::{Request, StatusCode},
    response::{IntoResponse, Response},
};
use tower::ServiceExt;
use tower_http::services::ServeDir;
use ubyte::ToByteUnit;

use crate::files::entry::FilesDirEntry;
use crate::files::template::web_files;

mod entry;
mod template;

pub async fn files_service(req: Request<Body>) -> Result<Response, Infallible> {
    let local_files_folder_path = std::env::var("FILES_PATH").unwrap_or_else(|_| String::from(""));

    let request_path = req.uri().path().to_string();
    let relative_path = request_path
        .trim_start_matches("/files/")
        .trim_start_matches('/');

    // full path on disk
    let full_path = format!(
        "{}/{}",
        local_files_folder_path.trim_end_matches('/'),
        relative_path
    );

    match tokio::fs::metadata(&full_path).await {
        Ok(metadata) => {
            if metadata.is_dir() {
                let mut entries: Vec<FilesDirEntry> = vec![];
                let mut dir = match tokio::fs::read_dir(&full_path).await {
                    Ok(dir) => dir,
                    Err(_) => {
                        return Ok((StatusCode::INTERNAL_SERVER_ERROR, "INTERNAL SERVER ERROR")
                            .into_response());
                    }
                };
                while let Ok(Some(entry)) = dir.next_entry().await {
                    let file_name = entry.file_name().to_string_lossy().into_owned();
                    let metadata = entry.metadata().await.unwrap();
                    if metadata.is_dir() {
                        entries.push(FilesDirEntry::Dir { name: file_name });
                    } else {
                        let filesize = metadata.len().bytes().to_string();
                        entries.push(FilesDirEntry::File {
                            name: file_name,
                            size: filesize,
                        });
                    }
                }
                entries.sort();
                let display_uri = format!("/files/{}", relative_path);
                let display_uri = if display_uri.ends_with('/') {
                    display_uri
                } else {
                    format!("{}/", display_uri)
                };
                Ok(web_files(&entries, display_uri).await)
            } else {
                Ok(ServeDir::new(&local_files_folder_path)
                    .oneshot(req)
                    .await
                    .unwrap()
                    .into_response())
            }
        }
        Err(_) => Ok((
            StatusCode::NOT_FOUND,
            "No such file found. Are you sure it exists?",
        )
            .into_response()),
    }
}
