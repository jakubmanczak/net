use std::convert::Infallible;

use axum::{
    body::Body,
    http::{Request, StatusCode},
    response::{IntoResponse, Response},
};
use tower::ServiceExt;
use tower_http::services::ServeDir;
use ubyte::ToByteUnit;

use crate::files::{crumb::Crumb, entry::FilesDirEntry, template::WebFiles};
use crate::{
    files::template::web_files,
    website::{get_current_year, pages},
};

mod crumb;
mod entry;
mod template;

pub async fn files_service(req: Request<Body>) -> Result<Response, Infallible> {
    let local_files_folder_path = std::env::var("FILES_PATH").unwrap_or_else(|_| String::from(""));

    let request_path = req.uri().path().to_string();
    let relative_path = request_path
        .trim_start_matches("/files/")
        .trim_start_matches('/');

    if request_path.contains("..") || request_path.contains('\\') {
        return Ok((StatusCode::FORBIDDEN, "don't.").into_response());
    }

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
                // let display_uri2 = display_uri.clone();

                let crumbs = {
                    let mut crumbs = Vec::new();
                    let mut current_path = String::new();
                    let parts: Vec<&str> = display_uri
                        .trim_matches('/')
                        .split('/')
                        .filter(|p| !p.is_empty())
                        .collect();

                    for part in parts {
                        current_path += part;
                        current_path += "/";
                        crumbs.push(Crumb {
                            display: part,
                            path: current_path.clone(),
                        });
                    }
                    crumbs
                };

                Ok(web_files(WebFiles {
                    dir_entries: &entries,
                    current_dir: &display_uri,
                    crumbs: &crumbs,
                    go_one_up: crumbs.iter().rev().take(2).last().map(|c| c.path.as_str()),
                    current_year: get_current_year(),
                })
                .await)
            } else {
                Ok(ServeDir::new(&local_files_folder_path)
                    .oneshot(req)
                    .await
                    .unwrap()
                    .into_response())
            }
        }
        Err(_) => Ok(pages::notfound::page(req.headers()).into_response()),
    }
}
