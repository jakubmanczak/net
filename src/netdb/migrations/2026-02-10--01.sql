CREATE TABLE featured (
    id              TEXT NOT NULL UNIQUE PRIMARY KEY,
    category        TEXT NOT NULL,
    title           TEXT NOT NULL,
    url             TEXT NOT NULL,
    desc            TEXT
);
