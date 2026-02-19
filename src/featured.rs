use rusqlite::Connection;
use uuid::Uuid;

use crate::netdb::DB_PATH;

pub struct Featured {
    pub id: Uuid,
    pub category: String,
    pub title: String,
    pub url: String,
    pub desc: Option<String>,
}

pub const CATEGORIES: &[(&str, &str)] = &[
    ("reads", "Reads"),
    ("tools", "Tools"),
    ("links", "Elsewhere"),
    ("fileslinks", "File Links"),
];

impl Featured {
    pub fn get_all() -> Result<Vec<Featured>, String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let mut stmt = conn
            .prepare("SELECT id, category, title, url, desc FROM featured")
            .map_err(|_| "DB fail.")?;
        let featureds = stmt
            .query_map([], |row| {
                Ok(Featured {
                    id: row.get(0)?,
                    category: row.get(1)?,
                    title: row.get(2)?,
                    url: row.get(3)?,
                    desc: row.get(4)?,
                })
            })
            .map_err(|_| "DB fail.")?
            .collect::<Result<Vec<_>, _>>()
            .map_err(|_| "DB fail.")?;
        Ok(featureds)
    }

    pub fn get_by_id(id: &Uuid) -> Result<Option<Featured>, String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let result = conn
            .prepare("SELECT id, category, title, url, desc FROM featured WHERE id = ?1")
            .map_err(|_| "DB fail.")?
            .query_row([id], |row| {
                Ok(Featured {
                    id: row.get(0)?,
                    category: row.get(1)?,
                    title: row.get(2)?,
                    url: row.get(3)?,
                    desc: row.get(4)?,
                })
            });

        match result {
            Ok(f) => Ok(Some(f)),
            Err(rusqlite::Error::QueryReturnedNoRows) => Ok(None),
            Err(_) => Err("DB fail.".into()),
        }
    }

    pub fn create(
        category: &str,
        title: &str,
        url: &str,
        desc: Option<&str>,
    ) -> Result<Featured, String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let id = Uuid::now_v7();
        conn.prepare(
            "INSERT INTO featured (id, category, title, url, desc) VALUES (?1, ?2, ?3, ?4, ?5)",
        )
        .map_err(|_| "DB fail.")?
        .execute((id, category, title, url, desc))
        .map_err(|_| "DB fail.")?;
        Ok(Featured {
            id,
            category: category.to_string(),
            title: title.to_string(),
            url: url.to_string(),
            desc: desc.map(|s| s.to_string()),
        })
    }

    pub fn update(
        &mut self,
        category: &str,
        title: &str,
        url: &str,
        desc: Option<&str>,
    ) -> Result<(), String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        conn.prepare(
            "UPDATE featured SET category = ?1, title = ?2, url = ?3, desc = ?4 WHERE id = ?5",
        )
        .map_err(|_| "DB fail.")?
        .execute((category, title, url, desc, self.id))
        .map_err(|_| "DB fail.")?;
        self.category = category.to_string();
        self.title = title.to_string();
        self.url = url.to_string();
        self.desc = desc.map(|s| s.to_string());
        Ok(())
    }

    pub fn delete(id: &Uuid) -> Result<bool, String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let rows = conn
            .prepare("DELETE FROM featured WHERE id = ?1")
            .map_err(|_| "DB fail.")?
            .execute([id])
            .map_err(|_| "DB fail.")?;
        Ok(rows > 0)
    }

    pub fn count() -> Result<usize, String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        conn.prepare("SELECT count(*) FROM featured")
            .map_err(|_| "DB fail.")?
            .query_row((), |r| r.get::<_, usize>(0))
            .map_err(|_| "DB fail.".into())
    }

    pub fn category_label(category: &str) -> &str {
        CATEGORIES
            .iter()
            .find(|(key, _)| *key == category)
            .map(|(_, label)| *label)
            .unwrap_or(category)
    }

    pub fn is_valid_category(category: &str) -> bool {
        CATEGORIES.iter().any(|(key, _)| *key == category)
    }
}
