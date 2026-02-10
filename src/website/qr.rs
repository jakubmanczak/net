use maud::{Markup, html};

use crate::website::{base, footer};

pub async fn web_qr() -> Markup {
    base(
        "manczak.net | qr",
        html! {
            div class="max-w-3xl flex flex-col mx-auto w-full p-3" {
                div class="flex flex-col sm:flex-row items-baseline justify-between w-full mt-8 px-2 sm:gap-4 pb-1 border-b-[.5] border-neutral-700" {
                    h1 class="text-2xl" {"QR Code Maker"}
                    p class="font-quicksand text-neutral-500" {
                        "back to " a href="/" class="text-blue-400 hover:underline"{"manczak.net"}
                    }
                }
                div class="flex flex-col-reverse sm:flex-row px-2 mt-8 gap-4 justify-between w-full" {
                    div class="flex-1 my-auto pb-4" {
                        p {"Your source input"}
                        input id="qrinput" type="text" placeholder="Data to be encoded in the QR code"
                            class="border border-neutral-700 hover:border-neutral-500 min-w-[300px] mt-1 rounded p-1 px-2 w-full font-quicksand";
                        div class="flex flex-row gap-4 mt-4" {
                            button id="downloadsvg" class="w-full bg-neutral-800 font-quicksand rounded p-1 px-2 border border-neutral-700 hover:border-neutral-500 cursor-pointer" {
                                "Download SVG"
                            }
                            button id="downloadpng" class="w-full bg-neutral-800 font-quicksand rounded p-1 px-2 border border-neutral-700 hover:border-neutral-500 cursor-pointer" {
                                "Download PNG"
                            }
                        }
                    }
                    div class="mx-auto size-44 bg-white rounded flex" {
                        div id="qroutput" class="size-40 rounded mx-auto my-auto *:w-full *:h-full" {}
                    }
                }
                script type="module" defer {
                    "import init from '/wasm_qr.js';"
                    "init({module_or_path: 'wasm_qr_bg.wasm'});"
                }
            }
            (footer())
        },
    )
}
