CREATE TABLE reflinks (
    id              BLOB NOT NULL UNIQUE PRIMARY KEY,
    ref             TEXT NOT NULL UNIQUE,
    destination     TEXT NOT NULL,
    revoked         INTEGER DEFAULT 0,
    created_at      INTEGER NOT NULL,
    created_by      BLOB NOT NULL
);
