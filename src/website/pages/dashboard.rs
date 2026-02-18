use axum::{
    http::HeaderMap,
    response::{IntoResponse, Redirect, Response},
};
use maud::{PreEscaped, html};

use crate::{
    authcrypto::{AuthError, UserAuthenticate},
    users::User,
    website::{base, footer, pages::icons},
};

pub fn page(headers: &HeaderMap) -> Result<Response, AuthError> {
    let u = User::authenticate(headers)?;
    if u.is_none() {
        return Ok(Redirect::to("/login").into_response());
    }
    let u = u.expect("redirect happened if none");
    Ok(base(
            "manczak.net | dashboard",
            html! {
                div class="max-w-3xl mx-auto w-full p-3" {
                    div class="flex flex-col sm:flex-row items-baseline justify-between w-full mt-8 px-2 sm:gap-4 pb-1 border-b-[.5] border-neutral-700" {
                        h1 class="text-2xl" {"Dashboard"}
                        p class="font-quicksand text-neutral-500" {
                            "back to " a href="/" class="text-blue-400 hover:underline"{"manczak.net"}
                        }
                    }
                    div class="rounded border border-neutral-600 bg-neutral-800 p-4 mt-4" {
                        h1 class="text-xl flex flex-row gap-2 items-center" {
                            (PreEscaped(icons::CIRCLE_USER)) "Hello, " (u.handle) "!"
                        }
                    }
                    div class="flex flex-col sm:flex-row gap-2 mt-2" {
                        a href="/dashboard/user-settings"
                            class="px-2 py-1 sm:ml-auto bg-neutral-800 border border-neutral-600 hover:border-neutral-500 hover:cursor-pointer rounded" {
                                "User settings"
                            }
                        a href="/api/auth/logout-form"
                            class="px-2 py-1 bg-neutral-800 border border-neutral-600 hover:border-neutral-500 hover:cursor-pointer rounded" {
                                "Log out"
                            }
                    }
                }
                (footer(Some(u)))
            },
        )
        .into_response())
}
