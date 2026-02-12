use maud::{Markup, html};

use crate::website::{base, footer};

pub fn page() -> Markup {
    base(
        "manczak.net | dashboard",
        html! {
            div class="max-w-3xl mx-auto w-full p-3" {
                p class="text-xl text-center" {"Under construction."}
            }
            (footer())
        },
    )
}
