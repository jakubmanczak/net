#[derive(Debug)]
pub struct Crumb<'a> {
    pub display: &'a str,
    pub path: String,
}
