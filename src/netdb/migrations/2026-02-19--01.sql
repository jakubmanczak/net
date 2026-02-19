CREATE TABLE splashes (
    id              BLOB NOT NULL UNIQUE PRIMARY KEY,
    content         TEXT NOT NULL UNIQUE
);
CREATE TABLE featured (
    id              BLOB NOT NULL UNIQUE PRIMARY KEY,
    category        TEXT NOT NULL,
    title           TEXT NOT NULL,
    url             TEXT NOT NULL,
    desc            TEXT
);

CREATE TABLE users (
    id              BLOB NOT NULL UNIQUE PRIMARY KEY,
    handle          TEXT NOT NULL UNIQUE,
    passhash        TEXT NOT NULL
);
CREATE TABLE sessions (
    id              BLOB NOT NULL UNIQUE PRIMARY KEY,
    token           TEXT NOT NULL UNIQUE,
    user_id         BLOB NOT NULL,
    issued          TEXT NOT NULL,
    expiry          TEXT NOT NULL,
    revoked         INTEGER NOT NULL
);

CREATE TABLE links (
    id              BLOB NOT NULL UNIQUE PRIMARY KEY,
    destination     TEXT NOT NULL,
    revoked         INTEGER DEFAULT 0,
    created_at      INTEGER NOT NULL
);
