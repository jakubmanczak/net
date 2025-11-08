#[macro_export]
macro_rules! embed_assets {
    ($($route:literal => $file:literal as $content_type:literal),* $(,)?) => {
        fn serve_asset(path: &str) -> Option<Response> {
            match path {
                $(
                    $route => {
                        const ASSET: &[u8] = include_bytes!($file);
                        Some(([(header::CONTENT_TYPE, $content_type)], ASSET).into_response())
                    }
                )*
                _ => None,
            }
        }
    };
}
