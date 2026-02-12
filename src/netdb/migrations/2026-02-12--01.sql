CREATE TABLE users (
    id              TEXT NOT NULL UNIQUE PRIMARY KEY,
    handle          TEXT NOT NULL UNIQUE,
    passhash        TEXT NOT NULL
);

CREATE TABLE sessions (
    id              TEXT NOT NULL UNIQUE PRIMARY KEY,
    token           TEXT NOT NULL UNIQUE,
    user_id         TEXT NOT NULL,
    issued          INTEGER NOT NULL,
    expiry          INTEGER NOT NULL,
    revoked         INTEGER NOT NULL
);
