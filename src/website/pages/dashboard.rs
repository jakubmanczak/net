use axum::{
    http::HeaderMap,
    response::{IntoResponse, Redirect, Response},
};
use maud::{PreEscaped, html};

use crate::{
    authcrypto::{AuthError, UserAuthenticate},
    splashes::Splash,
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
                div class="flex flex-col sm:flex-row items-baseline justify-between
                    w-full mt-8 px-2 sm:gap-4 pb-1 border-b-[.5] border-neutral-700" {
                    h1 class="text-2xl" {"Dashboard"}
                    p class="font-quicksand text-neutral-500" {
                        "back to " a href="/" class="text-blue-400 hover:underline"{
                            "manczak.net"
                        }
                    }
                }
                div class="rounded border border-neutral-600 bg-neutral-800 p-4 mt-4" {
                    h1 class="text-xl flex flex-row gap-2 items-center" {
                        (PreEscaped(icons::CIRCLE_USER)) "Hello, " (u.handle) "!"
                    }
                }
                div class="flex flex-col sm:flex-row gap-2 my-2 font-quicksand" {
                    a href="/dashboard/user-settings"
                        class="px-2 py-1 sm:ml-auto bg-neutral-800 border border-neutral-600
                            hover:border-neutral-500 hover:cursor-pointer rounded" {
                            "User settings"
                        }
                    a href="/api/auth/logout-form"
                        class="px-2 py-1 bg-neutral-800 border border-neutral-600
                            hover:border-neutral-500 hover:cursor-pointer rounded" {
                            "Log out"
                        }
                }
                div class="grid grid-cols-1 sm:grid-cols-2 gap-4" {
                    div {
                        h1 {"reference links"}
                        hr class="text-neutral-700 mt-1 mb-2";
                    }
                    div {
                        h1 {"splash texts"}
                        hr class="text-neutral-700 mt-1 mb-2";

                        div class="p-1 bg-neutral-800 border border-neutral-600 rounded font-quicksand" {
                            @match Splash::count() {
                                Ok(count) => {
                                    p class="text-center" {
                                        span class="text-xl font-quicksand font-semibold" {(count)}
                                        span class="text-neutral-400" {" splash texts"}
                                    }
                                }
                                Err(_) => {
                                    p class="text-red-400" {"Error loading splash count."}
                                }
                            }
                        }
                        div class="flex flex-col sm:flex-row gap-2 mt-2 font-quicksand" {
                            a class="p-1 bg-neutral-800 border border-neutral-600 flex-1
                                cursor-not-allowed --hover:border-neutral-500 rounded text-center" {
                                    "Insert"
                            }
                            a class="p-1 bg-neutral-800 border border-neutral-600 flex-1
                                cursor-not-allowed --hover:border-neutral-500 rounded text-center" {
                                    "Manage"
                            }
                        }
                    }
                    div {
                        h1 {"featureds"}
                        hr class="text-neutral-700 mt-1 mb-2";

                        p class="font-quicksand text-neutral-500" {
                            "Manage featureds " a href="/dashboard/featureds"
                                class="text-blue-400 hover:underline" {"here"} "."
                        }
                    }
                }
            }
            (footer(Some(u)))
        },
    )
    .into_response())
}
