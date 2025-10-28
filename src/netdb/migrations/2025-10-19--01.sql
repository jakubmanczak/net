CREATE TABLE links (
    id              TEXT NOT NULL UNIQUE PRIMARY KEY,
    destination     TEXT NOT NULL,
    revoked         INTEGER DEFAULT 0,
    created_at      INTEGER NOT NULL
);
