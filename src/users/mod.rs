use chrono::{DateTime, Duration, Utc};
use rusqlite::{Connection, OptionalExtension};
use uuid::Uuid;

use crate::{
    authcrypto::{TokenSize, generate_token, hash_password},
    netdb::DB_PATH,
};

#[derive(Clone)]
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
        let row = conn
            .prepare("SELECT user_id, issued, expiry, revoked FROM sessions WHERE id = ?1")
            .map_err(|_| "DB fail.")?
            .query_one([id], |r| {
                Ok((
                    r.get::<_, Uuid>(0)?,
                    r.get::<_, DateTime<Utc>>(1)?,
                    r.get::<_, DateTime<Utc>>(2)?,
                    r.get::<_, i64>(3)?,
                ))
            })
            .optional()
            .map_err(|_| "DB fail.")?;

        Ok(match row {
            Some((user_id, issued, expiry, revoked)) => {
                let user = User::get_by_id(&user_id)?.ok_or("User not found.")?;
                Some(Session {
                    id,
                    user,
                    issued,
                    expiry,
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
                    r.get::<_, Uuid>(0)?,
                    r.get::<_, Uuid>(1)?,
                    r.get::<_, DateTime<Utc>>(2)?,
                    r.get::<_, DateTime<Utc>>(3)?,
                    r.get::<_, i64>(4)?,
                ))
            })
            .optional()
            .map_err(|_| "DB fail.")?;

        Ok(match row {
            Some((id, user_id, issued, expiry, revoked)) => {
                let user = User::get_by_id(&user_id)?.ok_or("User not found.")?;
                Some(Session {
                    id,
                    user,
                    issued,
                    expiry,
                    revoked: revoked != 0,
                })
            }
            None => None,
        })
    }

    pub fn create(user: User) -> Result<(Session, String), String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let id = Uuid::now_v7();
        let token = generate_token(TokenSize::Char64);
        let issued = Utc::now();
        let expiry = issued + Session::DEFAULT_PROLONGATION;

        conn.prepare("INSERT INTO sessions (id, user_id, token, issued, expiry, revoked) VALUES (?1, ?2, ?3, ?4, ?5, 0)")
            .map_err(|_| "DB fail.")?
            .execute((id, user.id, &token, issued, expiry))
            .map_err(|_| "DB fail.")?;

        let session = Session {
            id,
            user,
            issued,
            expiry,
            revoked: false,
        };

        Ok((session, token))
    }

    pub fn get_by_user(user_id: Uuid) -> Result<Vec<Session>, String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let user = User::get_by_id(&user_id)?.ok_or("User not found.")?;
        let sessions: Vec<Session> = conn
            .prepare("SELECT id, issued, expiry, revoked FROM sessions WHERE user_id = ?1")
            .map_err(|_| "DB fail.")?
            .query_map([user_id], |r| {
                Ok((
                    r.get::<_, Uuid>(0)?,
                    r.get::<_, DateTime<Utc>>(1)?,
                    r.get::<_, DateTime<Utc>>(2)?,
                    r.get::<_, i64>(3)?,
                ))
            })
            .map_err(|_| "DB fail.")?
            .collect::<Result<Vec<_>, _>>()
            .map_err(|_| "DB fail.")?
            .into_iter()
            .map(|t| Session {
                id: t.0,
                user: User {
                    id: user.id,
                    handle: user.handle.clone(),
                },
                issued: t.1,
                expiry: t.2,
                revoked: t.3 != 0,
            })
            .collect();

        Ok(sessions)
    }

    pub fn get_all() -> Result<Vec<Session>, String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let sessions: Vec<Session> = conn
            .prepare("SELECT id, user_id, issued, expiry, revoked FROM sessions")
            .map_err(|_| "DB fail.")?
            .query_map([], |r| {
                Ok((
                    r.get::<_, Uuid>(0)?,
                    r.get::<_, Uuid>(1)?,
                    r.get::<_, DateTime<Utc>>(2)?,
                    r.get::<_, DateTime<Utc>>(3)?,
                    r.get::<_, i64>(4)?,
                ))
            })
            .map_err(|_| "DB fail.")?
            .collect::<Result<Vec<_>, _>>()
            .map_err(|_| "DB fail.")?
            .into_iter()
            .map(|t| -> Result<Session, String> {
                let user = User::get_by_id(&t.1)?.ok_or("User not found.")?;
                Ok(Session {
                    id: t.0,
                    user,
                    issued: t.2,
                    expiry: t.3,
                    revoked: t.4 != 0,
                })
            })
            .collect::<Result<Vec<_>, _>>()?;

        Ok(sessions)
    }

    const DEFAULT_PROLONGATION: Duration = Duration::days(14);
    const PROLONGATION_THRESHOLD: Duration = Duration::hours(2);
    pub fn prolong(&mut self) -> Result<(), String> {
        if self.expiry - Session::DEFAULT_PROLONGATION + Session::PROLONGATION_THRESHOLD
            > Utc::now()
        {
            return Ok(());
        }

        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let expiry = Utc::now() + Session::DEFAULT_PROLONGATION;
        conn.prepare("UPDATE sessions SET expiry = ?1 WHERE id = ?2")
            .map_err(|_| "DB fail.")?
            .execute((expiry, self.id))
            .map_err(|_| "DB fail.")?;
        self.expiry = expiry;
        Ok(())
    }

    pub fn revoke(&mut self) -> Result<(), String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        conn.prepare("UPDATE sessions SET revoked = 1 WHERE id = ?1")
            .map_err(|_| "DB fail.")?
            .execute([self.id])
            .map_err(|_| "DB fail.")?;
        self.revoked = true;
        Ok(())
    }
    pub fn is_expired(&self) -> bool {
        self.expiry < Utc::now()
    }
    pub fn is_expired_or_revoked(&self) -> bool {
        self.is_expired() || self.revoked
    }
}

impl User {
    pub fn get_by_id(id: &Uuid) -> Result<Option<User>, String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let handle = conn
            .prepare("SELECT handle FROM users WHERE id = ?1")
            .map_err(|_| "DB fail.")?
            .query_one([id], |r| Ok(r.get::<_, String>(0)?))
            .optional()
            .map_err(|_| "DB fail.")?;

        Ok(match handle {
            Some(handle) => Some(User { id: *id, handle }),
            None => None,
        })
    }
    pub fn get_by_handle(handle: &str) -> Result<Option<User>, String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let id = conn
            .prepare("SELECT id FROM users WHERE handle = ?1")
            .map_err(|_| "DB fail.")?
            .query_one([&handle], |r| Ok(r.get::<_, Uuid>(0)?))
            .optional()
            .map_err(|_| "DB fail.")?;

        Ok(match id {
            Some(id) => Some(User {
                id,
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
            .query_map([], |r| Ok((r.get::<_, Uuid>(0)?, r.get::<_, String>(1)?)))
            .map_err(|_| "DB fail.")?
            .collect::<Result<Vec<_>, _>>()
            .map_err(|_| "DB fail.")?
            .into_iter()
            .map(|t| User {
                id: t.0,
                handle: t.1,
            })
            .collect();

        Ok(users)
    }

    pub fn change_handle(&mut self, new_handle: &str) -> Result<(), String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        conn.prepare("UPDATE users SET handle = ?1 WHERE id = ?2")
            .map_err(|_| "DB fail.")?
            .execute((new_handle, self.id))
            .map_err(|_| "DB fail.")?;
        self.handle = new_handle.to_string();
        Ok(())
    }

    pub fn change_password(&mut self, new_password: &str) -> Result<(), String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let hash = hash_password(new_password)?;
        conn.prepare("UPDATE users SET passhash = ?1 WHERE id = ?2")
            .map_err(|_| "DB fail.")?
            .execute((hash, self.id))
            .map_err(|_| "DB fail.")?;
        Ok(())
    }

    pub fn verify_password(&self, password: &str) -> Result<bool, String> {
        let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
        let passhash = conn
            .prepare("SELECT passhash FROM users WHERE id = ?1")
            .map_err(|_| "DB fail.")?
            .query_one([self.id], |r| Ok(r.get::<_, String>(0)?))
            .map_err(|_| "DB fail.")?;

        use crate::authcrypto::check_hashed_password;
        check_hashed_password(password, &passhash)
    }
}

pub fn init_admin_if_none_present() -> Result<(), String> {
    if !User::get_all()?.is_empty() {
        return Ok(());
    }
    let conn = Connection::open(&*DB_PATH).map_err(|_| "DB fail.")?;
    let id = Uuid::max();
    let handle = "admin".to_string();
    let passw = generate_token(TokenSize::Char16);
    let hash = hash_password(&passw)?;

    conn.prepare("INSERT INTO users VALUES (?1, ?2, ?3)")
        .map_err(|_| "DB fail.")?
        .execute((id, handle, hash))
        .map_err(|_| "DB fail.")?;

    println!("[USERS] No users were found, so a default admin account has been initialized.");
    println!("[USERS] Handle: admin; Password: {}", passw);
    println!("[USERS] Remember to change this provisional password to a more secure one.");
    Ok(())
}
