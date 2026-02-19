use rusqlite::Connection;

use crate::netdb::DB_PATH;

pub struct Splash {
    // pub id: Uuid,
    // pub content: String,
}

impl Splash {
    pub fn count() -> Result<usize, rusqlite::Error> {
        Ok(Connection::open(&*DB_PATH)?
            .prepare("SELECT count(*) FROM splashes")?
            .query_one((), |r| r.get::<_, usize>(0))?)
    }
}
