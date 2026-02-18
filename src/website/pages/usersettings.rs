use axum::{
    http::HeaderMap,
    response::{IntoResponse, Redirect, Response},
};
use maud::html;

use crate::{
    authcrypto::{AuthError, UserAuthenticate},
    users::User,
    website::{JS_CLEAN_QUERY, base, footer},
};

pub fn page(headers: &HeaderMap, msg: Option<&str>) -> Result<Response, AuthError> {
    let u = User::authenticate(headers)?;
    if u.is_none() {
        return Ok(Redirect::to("/login").into_response());
    }
    let u = u.expect("redirect happened if none");

    Ok(base(
            "manczak.net | user settings",
            html! {
                div class="max-w-3xl mx-auto w-full p-3" {
                    div class="flex flex-col sm:flex-row items-baseline justify-between w-full mt-8 px-2 sm:gap-4 pb-1 border-b-[.5] border-neutral-700" {
                        h1 class="text-2xl" {"User Settings"}
                        p class="font-quicksand text-neutral-500" {
                            "back to " a href="/dashboard" class="text-blue-400 hover:underline"{"dashboard"}
                        }
                    }

                    @if let Some(message) = msg {
                        div class="mx-2 mt-4 p-3 bg-blue-900 border border-blue-700 rounded text-sm" {
                            (message)
                            script defer { (JS_CLEAN_QUERY) }
                        }
                    }
                    div class="flex flex-col gap-6 mx-2 py-4" {
                        div class="border-b border-neutral-700 pb-6" {
                            h2 class="text-lg font-semibold mb-3" {"Change Handle"}
                            form method="post" action="/api/self/change-handle-form" {
                                label for="handle" class="block mb-1 text-sm text-neutral-400" {"Handle"}
                                div class="flex" {
                                    input name="handle" value=(u.handle) autocomplete="off" class="px-2 py-1 bg-neutral-950
                                        border border-neutral-600 hover:border-neutral-500 rounded rounded-tr-none
                                        rounded-br-none font-quicksand hover:z-10 relative flex-grow";
                                    input type="submit" value="Update" class="cursor-pointer bg-neutral-800 py-1 px-4
                                        border border-neutral-600 rounded rounded-tl-none rounded-bl-none
                                        hover:border-neutral-500 -ml-[1px] hover:z-10 relative";
                                }
                            }
                        }

                        div class="pb-6" {
                            h2 class="text-lg font-semibold mb-3" {"Change Password"}
                            form method="post" action="/api/self/change-passw-form" class="flex flex-col gap-3" {
                                div {
                                    label for="current_password" class="block mb-1 text-sm text-neutral-400" {"Current Password"}
                                    input type="password" name="current_password" required autocomplete="current-password"
                                        class="w-full px-2 py-1 bg-neutral-950 border border-neutral-600 hover:border-neutral-500 rounded font-quicksand";
                                }
                                div {
                                    label for="new_password" class="block mb-1 text-sm text-neutral-400" {"New Password"}
                                    input type="password" name="new_password" required autocomplete="new-password"
                                        class="w-full px-2 py-1 bg-neutral-950 border border-neutral-600 hover:border-neutral-500 rounded font-quicksand";
                                }
                                div {
                                    label for="confirm_password" class="block mb-1 text-sm text-neutral-400" {"Confirm New Password"}
                                    input type="password" name="confirm_password" required autocomplete="new-password"
                                        class="w-full px-2 py-1 bg-neutral-950 border border-neutral-600 hover:border-neutral-500 rounded font-quicksand";
                                }

                                div class="mt-4" {
                                    input type="submit" value="Change Password"
                                        class="cursor-pointer bg-neutral-800 py-2 px-6 border border-neutral-600 rounded hover:border-neutral-500";
                                }
                            }
                        }
                    }
                }
                (footer(Some(u)))
            },
        )
        .into_response())
}
