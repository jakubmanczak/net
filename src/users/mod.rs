use chrono::{DateTime, Utc};
use rusqlite::{Connection, OptionalExtension};
use uuid::Uuid;

use crate::{
    authcrypto::{TokenSize, generate_token, hash_password},
    netdb::DB_PATH,
};

pub struct User {
    pub id: Uuid,
    pub handle: String,
}

pub struct Session {
    pub id: Uuid,
    pub user: User,
    pub issued: DateTime<Utc>,
    pub expiry: DateTime<Utc>,
    pub revoked: bool,
}

impl Session {
    pub fn get_by_id(id: Uuid) -> Result<Option<Session>, String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let idstr = id.to_string();
        let row = conn
            .prepare("SELECT user_id, issued, expiry, revoked FROM sessions WHERE id = ?1")
            .map_err(|_| "DB fail.")?
            .query_one([&idstr], |r| {
                Ok((
                    r.get::<_, String>(0)?,
                    r.get::<_, i64>(1)?,
                    r.get::<_, i64>(2)?,
                    r.get::<_, i64>(3)?,
                ))
            })
            .optional()
            .map_err(|_| "DB fail.")?;

        Ok(match row {
            Some((user_id, issued, expiry, revoked)) => {
                let user_uuid = Uuid::try_parse(&user_id).map_err(|_| "Uuid parse fail.")?;
                let user = User::get_by_id(user_uuid)?.ok_or("User not found.")?;
                Some(Session {
                    id,
                    user,
                    issued: DateTime::from_timestamp(issued, 0).ok_or("Invalid timestamp.")?,
                    expiry: DateTime::from_timestamp(expiry, 0).ok_or("Invalid timestamp.")?,
                    revoked: revoked != 0,
                })
            }
            None => None,
        })
    }

    pub fn get_by_token(token: &str) -> Result<Option<Session>, String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let row = conn
            .prepare("SELECT id, user_id, issued, expiry, revoked FROM sessions WHERE token = ?1")
            .map_err(|_| "DB fail.")?
            .query_one([&token], |r| {
                Ok((
                    r.get::<_, String>(0)?,
                    r.get::<_, String>(1)?,
                    r.get::<_, i64>(2)?,
                    r.get::<_, i64>(3)?,
                    r.get::<_, i64>(4)?,
                ))
            })
            .optional()
            .map_err(|_| "DB fail.")?;

        Ok(match row {
            Some((id, user_id, issued, expiry, revoked)) => {
                let user_uuid = Uuid::try_parse(&user_id).map_err(|_| "Uuid parse fail.")?;
                let user = User::get_by_id(user_uuid)?.ok_or("User not found.")?;
                Some(Session {
                    id: Uuid::try_parse(&id).map_err(|_| "Uuid parse fail.")?,
                    user,
                    issued: DateTime::from_timestamp(issued, 0).ok_or("Invalid timestamp.")?,
                    expiry: DateTime::from_timestamp(expiry, 0).ok_or("Invalid timestamp.")?,
                    revoked: revoked != 0,
                })
            }
            None => None,
        })
    }

    pub fn get_by_user(user_id: Uuid) -> Result<Vec<Session>, String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let user_idstr = user_id.to_string();
        let user = User::get_by_id(user_id)?.ok_or("User not found.")?;
        let sessions: Vec<Session> = conn
            .prepare("SELECT id, issued, expiry, revoked FROM sessions WHERE user_id = ?1")
            .map_err(|_| "DB fail.")?
            .query_map([&user_idstr], |r| {
                Ok((
                    r.get::<_, String>(0)?,
                    r.get::<_, i64>(1)?,
                    r.get::<_, i64>(2)?,
                    r.get::<_, i64>(3)?,
                ))
            })
            .map_err(|_| "DB fail.")?
            .collect::<Result<Vec<_>, _>>()
            .map_err(|_| "DB fail.")?
            .iter()
            .map(|t| -> Result<Session, String> {
                Ok(Session {
                    id: Uuid::parse_str(&t.0).map_err(|_| "Invalid UUID")?,
                    user: User {
                        id: user.id,
                        handle: user.handle.clone(),
                    },
                    issued: DateTime::from_timestamp(t.1, 0).ok_or("Invalid timestamp.")?,
                    expiry: DateTime::from_timestamp(t.2, 0).ok_or("Invalid timestamp.")?,
                    revoked: t.3 != 0,
                })
            })
            .collect::<Result<Vec<_>, _>>()?;

        Ok(sessions)
    }

    pub fn get_all() -> Result<Vec<Session>, String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let sessions: Vec<Session> = conn
            .prepare("SELECT id, user_id, issued, expiry, revoked FROM sessions")
            .map_err(|_| "DB fail.")?
            .query_map([], |r| {
                Ok((
                    r.get::<_, String>(0)?,
                    r.get::<_, String>(1)?,
                    r.get::<_, i64>(2)?,
                    r.get::<_, i64>(3)?,
                    r.get::<_, i64>(4)?,
                ))
            })
            .map_err(|_| "DB fail.")?
            .collect::<Result<Vec<_>, _>>()
            .map_err(|_| "DB fail.")?
            .iter()
            .map(|t| -> Result<Session, String> {
                let user_uuid = Uuid::parse_str(&t.1).map_err(|_| "Invalid UUID")?;
                let user = User::get_by_id(user_uuid)?.ok_or("User not found.")?;
                Ok(Session {
                    id: Uuid::parse_str(&t.0).map_err(|_| "Invalid UUID")?,
                    user,
                    issued: DateTime::from_timestamp(t.2, 0).ok_or("Invalid timestamp.")?,
                    expiry: DateTime::from_timestamp(t.3, 0).ok_or("Invalid timestamp.")?,
                    revoked: t.4 != 0,
                })
            })
            .collect::<Result<Vec<_>, _>>()?;

        Ok(sessions)
    }

    pub fn revoke(&mut self) -> Result<(), String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let idstr = self.id.to_string();
        conn.prepare("UPDATE sessions SET revoked = 1 WHERE id = ?1")
            .map_err(|_| "DB fail.")?
            .execute([&idstr])
            .map_err(|_| "DB fail.")?;
        self.revoked = true;
        Ok(())
    }
}

impl User {
    pub fn get_by_id(id: Uuid) -> Result<Option<User>, String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let idstr = id.to_string();
        let handle = conn
            .prepare("SELECT handle FROM users WHERE id = ?1")
            .map_err(|_| "DB fail.")?
            .query_one([&idstr], |r| Ok(r.get::<_, String>(0)?))
            .optional()
            .map_err(|_| "DB fail.")?;

        Ok(match handle {
            Some(handle) => Some(User { id, handle: handle }),
            None => None,
        })
    }
    pub fn get_by_handle(handle: &str) -> Result<Option<User>, String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let id = conn
            .prepare("SELECT id FROM users WHERE handle = ?1")
            .map_err(|_| "DB fail.")?
            .query_one([&handle], |r| Ok(r.get::<_, String>(0)?))
            .optional()
            .map_err(|_| "DB fail.")?;

        Ok(match id {
            Some(id) => Some(User {
                id: Uuid::try_parse(&id).map_err(|_| "Uuid parse fail.")?,
                handle: handle.to_string(),
            }),
            None => None,
        })
    }
    pub fn get_all() -> Result<Vec<User>, String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let users: Vec<User> = conn
            .prepare("SELECT id, handle FROM users")
            .map_err(|_| "DB fail.")?
            .query_map([], |r| Ok((r.get::<_, String>(0)?, r.get::<_, String>(1)?)))
            .map_err(|_| "DB fail.")?
            .collect::<Result<Vec<_>, _>>()
            .map_err(|_| "DB fail.")?
            .iter()
            .map(|t| -> Result<User, String> {
                Ok(User {
                    id: Uuid::parse_str(&t.0).map_err(|_| "Invalid UUID")?,
                    handle: t.1.clone(),
                })
            })
            .collect::<Result<Vec<_>, _>>()?;

        Ok(users)
    }

    pub fn change_handle(&mut self, new_handle: &str) -> Result<(), String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let idstr = self.id.to_string();
        conn.prepare("UPDATE users SET handle = ?1 WHERE id = ?2")
            .map_err(|_| "DB fail.")?
            .execute([&new_handle, idstr.as_str()])
            .map_err(|_| "DB fail.")?;
        self.handle = new_handle.to_string();
        Ok(())
    }
}

pub fn init_admin_if_none_present() -> Result<(), String> {
    if !User::get_all()?.is_empty() {
        return Ok(());
    }
    let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
    let id = Uuid::max().to_string();
    let handle = "admin".to_string();
    let passw = generate_token(TokenSize::Char16);
    let hash = hash_password(&passw)?;

    conn.prepare("INSERT INTO users VALUES (?1, ?2, ?3)")
        .map_err(|_| "DB fail.")?
        .execute([&id, &handle, &hash])
        .map_err(|_| "DB fail.")?;

    println!("[USERS] No users were found, so a default admin account has been initialized.");
    println!("[USERS] Handle: admin; Password: {}", passw);
    println!("[USERS] Remember to change this provisional password to a more secure one.");
    Ok(())
}
