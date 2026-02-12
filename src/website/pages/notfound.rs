use maud::{Markup, html};

use crate::website::{base, footer};

pub fn page() -> Markup {
    base(
        "manczak.net | not found :(",
        html! {
            div class="max-w-3xl mx-auto w-full p-3" {
                div class="flex flex-row w-full mt-16 gap-4" {
                    img src="https://manczak.net/mow2024.png"
                        alt="Me at a debate tournament"
                        class="size-20 rounded border border-neutral-700";
                    div class="mt-2 w-full" {
                        h2 class="text-2xl tracking-wide font-semibold" {"jakub mańczak"}
                        p class="w-full h-6 font-quicksand text-neutral-500" {
                            "was not able to find the file you want"
                        }
                    }
                }
                div class="mt-12" {
                    span class="text-xl" {"Error 404"}
                    p class="text-xl text-stone-400 block mb-4" {"No resource exists here!"}
                    a href="/" class="text-blue-400 hover:underline focus:underline underline-offset-2 font-quicksand block"{
                        "Go back to homepage."
                    }
                    a href="/files/" class="text-blue-400 hover:underline focus:underline underline-offset-2 font-quicksand block" {
                        "Go back to file tree."
                    }
                }
            }
            (footer())
        },
    )
}
