use askama::Template;
use axum::{
    http::StatusCode,
    response::{Html, IntoResponse, Response},
};
use rusqlite::Connection;

use crate::{
    netdb::{DB_PATH, DBERRORMSG, featured::Featured},
    website::get_current_year,
};

#[derive(Template)]
#[template(path = "index.html")]
struct WebIndex<'a> {
    current_year: i32,
    reads: Vec<Read<'a>>,
    tools: Vec<Tool<'a>>,
    links: Vec<Link<'a>>,
    files_links: Vec<FilesLink<'a>>,
    services: &'a [ServiceFinal<'a>],
}
pub struct Read<'a> {
    pub title: &'a str,
    pub url: &'a str,
    pub description: &'a str,
}
pub struct Tool<'a> {
    pub title: &'a str,
    pub url: &'a str,
    pub description: &'a str,
}
pub struct Link<'a> {
    pub name: &'a str,
    pub url: &'a str,
    pub label: &'a str,
}
pub struct FilesLink<'a> {
    pub location: &'a str,
    pub description: &'a str,
}

#[derive(PartialEq)]
#[allow(unused)]
pub enum ServiceStatus<'a> {
    Ok,
    Unresponsive(&'a str),
    // Error(&'a str),
}
pub struct ServiceFinal<'a> {
    pub name: &'a str,
    pub status: ServiceStatus<'a>,
}

pub trait ServiceFinalVec {
    fn all_statuses_ok(&self) -> bool;
}
impl<'a> ServiceFinalVec for [ServiceFinal<'a>] {
    fn all_statuses_ok(&self) -> bool {
        self.iter().all(|el| el.status == ServiceStatus::Ok)
    }
}

pub async fn web_index() -> Result<Response, (StatusCode, String)> {
    let conn = Connection::open(&*DB_PATH)
        .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, DBERRORMSG.into()))?;
    let mut stmt = conn
        .prepare("SELECT * FROM featured")
        .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, DBERRORMSG.into()))?;
    let featureds: Vec<Featured> = stmt
        .query_map([], |row| {
            Ok(Featured {
                category: row.get(1)?,
                title: row.get(2)?,
                url: row.get(3)?,
                desc: row.get(4)?,
            })
        })
        .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, DBERRORMSG.into()))?
        .collect::<Result<Vec<_>, _>>()
        .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, DBERRORMSG.into()))?;

    let a = WebIndex {
        current_year: get_current_year(),
        reads: featureds
            .iter()
            .filter(|f| f.category == "reads")
            .map(|f| Read {
                title: &f.title,
                description: f.desc.as_deref().unwrap_or(""),
                url: &f.url,
            })
            .collect(),
        tools: featureds
            .iter()
            .filter(|f| f.category == "tools")
            .map(|f| Tool {
                title: &f.title,
                description: f.desc.as_deref().unwrap_or(""),
                url: &f.url,
            })
            .collect(),
        links: featureds
            .iter()
            .filter(|f| f.category == "links")
            .map(|f| Link {
                label: &f.title,
                name: f.desc.as_deref().unwrap_or(""),
                url: &f.url,
            })
            .collect(),
        files_links: featureds
            .iter()
            .filter(|f| f.category == "fileslinks")
            .map(|f| FilesLink {
                location: &f.url,
                description: &f.title,
            })
            .collect(),
        services: &vec![],
    };
    Ok(match a.render() {
        Ok(res) => (StatusCode::OK, Html(res)).into_response(),
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()).into_response(),
    })
}
