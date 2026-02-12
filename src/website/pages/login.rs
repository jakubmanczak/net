use maud::{Markup, html};

use crate::website::{base, footer};

pub fn page() -> Markup {
    base(
        "manczak.net | log in",
        html! {
            div class="max-w-3xl my-auto mx-auto w-full p-3" {
                form action="/api/auth/login-form" method="post"
                    class="max-w-xl mx-auto flex flex-col gap-2 bg-neutral-800 border border-neutral-600 rounded p-4" {
                    h1 class="text-2xl mb-4" {"Log in"}
                    label for="uname" class="block mx-2" {"Username"}
                    input id="uname" name="uname" placeholder="Username"
                        class="block w-full py-1 px-2 bg-neutral-900 border border-neutral-600 rounded" {}
                    label for="passw" class="block mx-2" {"Password"}
                    input id="passw" name="passw" type="password" placeholder="Password"
                        class="block w-full py-1 px-2 bg-neutral-900 border border-neutral-600 rounded" {}
                    input type="hidden" id="redir" name="redir" value="dashboard";
                    input type="submit" value="Log in"
                        class="cursor-pointer bg-neutral-900 py-1 px-4 ml-auto border border-neutral-600 rounded hover:border-neutral-500";
                }
            }
            (footer())
        },
    )
}
