use askama::Template;
use axum::{
    http::StatusCode,
    response::{Html, IntoResponse, Response},
};

use crate::website::get_current_year;

#[derive(Template)]
#[template(path = "index.html")]
struct WebIndex<'a> {
    current_year: i32,
    reads: &'a [Read<'a>],
    works: &'a [Work<'a>],
    links: &'a [Link<'a>],
    tools: &'a [Tool<'a>],
    files_links: &'a [FilesLink<'a>],
}
pub struct Read<'a> {
    pub title: &'a str,
    pub url: &'a str,
    pub description: &'a str,
}
pub struct Work<'a> {
    pub title: &'a str,
    pub url: &'a str,
    pub description: &'a str,
}
pub struct Link<'a> {
    pub name: &'a str,
    pub url: &'a str,
    pub label: &'a str,
}
pub struct Tool<'a> {
    pub name: &'a str,
    pub url: &'a str,
    pub desc: &'a str,
}
pub struct FilesLink<'a> {
    pub location: &'a str,
    pub description: &'a str,
}

pub async fn web_index() -> Response {
    let a = WebIndex {
        current_year: get_current_year(),
        reads: &vec![
            Read {
                title: "Turing vs. Nietoperze",
                url: "/files/reads/turing-vs-nietoperze.pdf",
                description: "Test Turinga a problem innych umysłów.",
            },
            Read {
                title: "Wiersze z Technikum",
                url: "/files/reads/wiersze-z-technikum.pdf",
                description: "Second-rate poems from my time in high school.",
            },
        ],
        works: &vec![
            Work {
                title: "Debate Tools",
                description: "Precursor to debateco.re: speech tracker.",
                url: "https://debates.manczak.net",
            },
            Work {
                title: "Katakanize - グレート!",
                description: "Transliterate into gibberish katakana in no time!",
                url: "https://katakanize.vercel.app",
            },
            // Work {
            //     title: "Weryfikator numerów PESEL",
            //     description: "Analiza struktury numeru pesel.",
            //     url: "https://numerpesel.vercel.app",
            // },
        ],
        tools: &vec![Tool {
            name: "QR Code Maker",
            url: "/qr-encode",
            desc: "Instant Input->QR encoder (SVG/PNG)",
        }],
        links: &vec![
            Link {
                name: "jakubmanczak",
                url: "https://github.com/jakubmanczak",
                label: "github",
            },
            Link {
                name: "@manczak.net",
                url: "https://bsky.app/profile/manczak.net",
                label: "bluesky",
            },
            Link {
                name: "in/jakubmanczak",
                url: "https://linkedin.com/in/jakubmanczak/",
                label: "linkedin",
            },
        ],
        files_links: &vec![
            FilesLink {
                location: "/files/cv.pdf",
                description: "corporate entity summoning scroll",
            },
            FilesLink {
                location: "/files/library",
                description: "distribution of collected works",
            },
            FilesLink {
                location: "/files/",
                description: "directory listing leading to all files",
            },
        ],
    };
    match a.render() {
        Ok(res) => (StatusCode::OK, Html(res)).into_response(),
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()).into_response(),
    }
}
