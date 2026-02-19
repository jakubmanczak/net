use axum::{
    http::HeaderMap,
    response::{IntoResponse, Redirect, Response},
};
use maud::html;

use crate::{
    authcrypto::{AuthError, UserAuthenticate},
    featured::{CATEGORIES, Featured},
    users::User,
    website::{JS_CLEAN_QUERY, base, footer},
};

pub fn page(headers: &HeaderMap, msg: Option<&str>) -> Result<Response, AuthError> {
    let u = User::authenticate(headers)?;
    if u.is_none() {
        return Ok(Redirect::to("/login").into_response());
    }
    let u = u.expect("redirect happened if none");

    let featureds = Featured::get_all().unwrap_or_default();

    Ok(page_inner(&u, msg, &featureds).into_response())
}

fn page_inner(u: &User, msg: Option<&str>, featureds: &[Featured]) -> Response {
    base(
        "manczak.net | featureds",
        html! {
            div class="max-w-3xl mx-auto w-full p-3" {
                div class="flex flex-col sm:flex-row items-baseline justify-between
                    w-full mt-8 px-2 sm:gap-4 pb-1 border-b-[.5] border-neutral-700" {
                    h1 class="text-2xl" { "Featureds" }
                    p class="font-quicksand text-neutral-500" {
                        "back to " a href="/dashboard" class="text-blue-400 hover:underline" {
                            "dashboard"
                        }
                    }
                }

                @if let Some(message) = msg {
                    div class="mx-2 mt-4 p-3 bg-blue-900 border border-blue-700 rounded text-sm" {
                        (message)
                        script defer { (JS_CLEAN_QUERY) }
                    }
                }

                div class="mx-2 mt-6 border border-neutral-600 rounded bg-neutral-800 p-4" {
                    h2 class="text-lg font-semibold mb-3" { "Add new featured" }
                    form method="post" action="/api/featureds/create-form" class="flex flex-col gap-3" {
                        div class="grid grid-cols-1 sm:grid-cols-2 gap-3" {
                            div {
                                label for="category" class="block mb-1 text-sm text-neutral-400" { "Category" }
                                select name="category" required
                                    class="w-full px-2 py-1 bg-neutral-950 border border-neutral-600
                                        hover:border-neutral-500 rounded font-quicksand" {
                                    @for (key, label) in CATEGORIES {
                                        option value=(key) { (label) }
                                    }
                                }
                            }
                            div {
                                label for="title" class="block mb-1 text-sm text-neutral-400" { "Title" }
                                input type="text" name="title" required autocomplete="off"
                                    placeholder="My Cool Thing"
                                    class="w-full px-2 py-1 bg-neutral-950 border border-neutral-600
                                        hover:border-neutral-500 rounded font-quicksand";
                            }
                        }
                        div {
                            label for="url" class="block mb-1 text-sm text-neutral-400" { "URL" }
                            input type="text" name="url" required autocomplete="off"
                                placeholder="https://example.com"
                                class="w-full px-2 py-1 bg-neutral-950 border border-neutral-600
                                    hover:border-neutral-500 rounded font-quicksand";
                        }
                        div {
                            label for="desc" class="block mb-1 text-sm text-neutral-400" {
                                "Description "
                                span class="text-neutral-600" { "(optional)" }
                            }
                            input type="text" name="desc" autocomplete="off"
                                placeholder="A short description"
                                class="w-full px-2 py-1 bg-neutral-950 border border-neutral-600
                                    hover:border-neutral-500 rounded font-quicksand";
                        }
                        div class="mt-1" {
                            input type="submit" value="Add Featured"
                                class="cursor-pointer bg-neutral-700 py-1.5 px-5 border border-neutral-600
                                    rounded hover:border-neutral-500 font-quicksand text-sm";
                        }
                    }
                }

                div class="mx-2 mt-6 mb-8" {
                    h2 class="text-lg font-semibold mb-3" { "Current featureds" }

                    @if featureds.is_empty() {
                        p class="text-neutral-500 font-quicksand text-sm" { "No featureds yet." }
                    } @else {
                        @for (cat_key, cat_label) in CATEGORIES {
                            @let cat_items: Vec<&Featured> = featureds.iter().filter(|f| f.category == *cat_key).collect();
                            @if !cat_items.is_empty() {
                                div class="mb-5" {
                                    h3 class="text-sm text-neutral-400 uppercase tracking-wider mb-2 font-quicksand" {
                                        (cat_label)
                                        span class="text-neutral-600 normal-case tracking-normal" {
                                            " (" (cat_items.len()) ")"
                                        }
                                    }
                                    div class="flex flex-col gap-2" {
                                        @for featured in &cat_items {
                                            div class="border border-neutral-700 rounded bg-neutral-800 p-3" {
                                                div class="flex flex-col sm:flex-row sm:items-start gap-2 justify-between" {
                                                    div class="flex-1 min-w-0" {
                                                        p class="font-semibold text-stone-200 break-words" { (featured.title) }
                                                        a href=(featured.url)
                                                            class="text-blue-400 hover:underline font-quicksand text-sm break-all"
                                                            target="_blank" {
                                                            (featured.url)
                                                        }
                                                        @if let Some(desc) = &featured.desc {
                                                            p class="text-neutral-400 text-sm font-quicksand mt-1" { (desc) }
                                                        }
                                                        p class="text-neutral-600 text-xs font-quicksand mt-1" {
                                                            (featured.id)
                                                        }
                                                    }
                                                    div class="flex flex-row gap-1 sm:flex-col sm:items-end shrink-0" {
                                                        button type="button"
                                                            onclick={"document.getElementById('edit-" (featured.id) "').classList.toggle('hidden')"}
                                                            class="text-xs px-2 py-1 bg-neutral-700 border border-neutral-600
                                                                hover:border-neutral-500 rounded cursor-pointer font-quicksand" {
                                                            "Edit"
                                                        }
                                                        form method="post" action="/api/featureds/delete-form"
                                                            onsubmit="return confirm('Delete this featured?')" {
                                                            input type="hidden" name="id" value=(featured.id);
                                                            input type="submit" value="Delete"
                                                                class="text-xs px-2 py-1 bg-neutral-700 border border-red-900
                                                                    hover:border-red-700 hover:bg-red-950 rounded cursor-pointer
                                                                    font-quicksand text-red-400";
                                                        }
                                                    }
                                                }
                                                // edit form hidden by default
                                                div id={"edit-" (featured.id)} class="hidden mt-3 pt-3 border-t border-neutral-700" {
                                                    form method="post" action="/api/featureds/edit-form" class="flex flex-col gap-2" {
                                                        input type="hidden" name="id" value=(featured.id);
                                                        div class="grid grid-cols-1 sm:grid-cols-2 gap-2" {
                                                            div {
                                                                label class="block mb-1 text-xs text-neutral-400" { "Category" }
                                                                select name="category"
                                                                    class="w-full px-2 py-1 bg-neutral-950 border border-neutral-600
                                                                        hover:border-neutral-500 rounded font-quicksand text-sm" {
                                                                    @for (key, label) in CATEGORIES {
                                                                        @if *key == featured.category {
                                                                            option value=(key) selected { (label) }
                                                                        } @else {
                                                                            option value=(key) { (label) }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            div {
                                                                label class="block mb-1 text-xs text-neutral-400" { "Title" }
                                                                input type="text" name="title" value=(featured.title) required
                                                                    class="w-full px-2 py-1 bg-neutral-950 border border-neutral-600
                                                                        hover:border-neutral-500 rounded font-quicksand text-sm";
                                                            }
                                                        }
                                                        div {
                                                            label class="block mb-1 text-xs text-neutral-400" { "URL" }
                                                            input type="text" name="url" value=(featured.url) required
                                                                class="w-full px-2 py-1 bg-neutral-950 border border-neutral-600
                                                                    hover:border-neutral-500 rounded font-quicksand text-sm";
                                                        }
                                                        div {
                                                            label class="block mb-1 text-xs text-neutral-400" { "Description" }
                                                            input type="text" name="desc" value=(featured.desc.as_deref().unwrap_or(""))
                                                                class="w-full px-2 py-1 bg-neutral-950 border border-neutral-600
                                                                    hover:border-neutral-500 rounded font-quicksand text-sm";
                                                        }
                                                        div class="flex gap-2 mt-1" {
                                                            input type="submit" value="Save Changes"
                                                                class="cursor-pointer text-xs px-3 py-1 bg-neutral-700 border
                                                                    border-neutral-600 hover:border-neutral-500 rounded font-quicksand";
                                                            button type="button"
                                                                onclick={"document.getElementById('edit-" (featured.id) "').classList.add('hidden')"}
                                                                class="text-xs px-3 py-1 bg-neutral-800 border border-neutral-600
                                                                    hover:border-neutral-500 rounded cursor-pointer font-quicksand
                                                                    text-neutral-400" {
                                                                "Cancel"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            (footer(Some(u.clone())))
        },
    )
    .into_response()
}
