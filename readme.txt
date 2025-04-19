manczak.net

This is the source code of my website. It runs as a Rust compiled binary hosting an api,
which serves the(statically rendered via Zola) main website as well as other parts of
the website project.

Compilation (cargo build -r) prerequisites:
* new-ish version of cargo & rustc
* having built the main website into ./web/public/ via Zola CLI (zola build)
    * if any styling changes made, having ran tailwind
      (tw -i tailwind.input.css -o static/styles.css --content "./**/*.html" --watch)

Feature plan:
* About/Overview
    * Project/blog/writing amalgamation pages
    * Funky splash text cannon
* Machine statues & load, game server load reporting
    * TF2/Source Server Query, Minecraft Server Query
    * Subproject: server status reporting binary
* Secure file tree hosting (secret files?)
* Link shortening, bookmarks
