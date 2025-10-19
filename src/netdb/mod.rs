use std::{error::Error, sync::LazyLock};

use rusqlite::{Connection, OptionalExtension};

pub static DB_PATH: LazyLock<String> =
    LazyLock::new(|| std::env::var("DB_PATH").unwrap_or(String::from("net.db")));

const PRAGMA_WAL_MODE: &str = "PRAGMA journal_mode = WAL";
const TABLE_MIGRATIONS: &str = r#"
    CREATE TABLE IF NOT EXISTS migrations (
        id          TEXT    PRIMARY KEY,
        time        INTEGER DEFAULT (unixepoch())
    );
"#;

macro_rules! migration {
    ($name:literal) => {
        ($name, include_str!(concat!("./", $name, ".sql")))
    };
}

const MIGRATIONS: &[(&str, &str)] = &[migration!("2025-10-19--01")];

pub fn migrations() -> Result<(), Box<dyn Error>> {
    let conn = Connection::open(&*DB_PATH)?;
    conn.query_row(PRAGMA_WAL_MODE, [], |_| Ok(()))?;
    conn.execute(TABLE_MIGRATIONS, [])?;

    let mut changes = false;
    for (key, sql) in MIGRATIONS {
        let mut statement = conn.prepare("SELECT id, time FROM migrations WHERE id = ?1")?;
        let query = statement.query_one([key], |_| Ok(())).optional()?;
        if query.is_some() {
            continue;
        }
        changes = true;
        println!("Applying migration {key}...");

        conn.execute_batch(sql)?;
        conn.execute("INSERT INTO migrations(id) VALUES (?1)", &[key])?;
    }

    if changes {
        println!("Migrations applied.")
    }
    Ok(())
}
