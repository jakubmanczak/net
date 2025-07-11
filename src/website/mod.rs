use chrono::{Datelike, Utc};
use chrono_tz::Europe::Warsaw;

pub mod index;

pub fn get_current_year() -> i32 {
    Utc::now().with_timezone(&Warsaw).year()
}
