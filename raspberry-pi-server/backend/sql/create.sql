CREATE TABLE image (
    id          INTEGER NOT NULL PRIMARY KEY,
    image       BLOB,
    thumbnail   BLOB
);

CREATE TABLE storage (
    id          INTEGER NOT NULL PRIMARY KEY,
    name        TEXT    NOT NULL,
    image_id    INTEGER,
    FOREIGN KEY (image_id)
        REFERENCES image (id)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
);

CREATE TABLE section (
    id          INTEGER NOT NULL PRIMARY KEY,
    storage_id  INTEGER NOT NULL,
    name        TEXT    NOT NULL,
    position    TEXT    NOT NULL,
    FOREIGN KEY (storage_id)
        REFERENCES storage (id)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
);

CREATE TABLE item (
    id          INTEGER NOT NULL PRIMARY KEY,
    section_id  INTEGER NOT NULL,
    name        TEXT    NOT NULL,
    description TEXT,
    FOREIGN KEY (section_id)
        REFERENCES section (id)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
);

CREATE TABLE item_image (
    id          INTEGER NOT NULL PRIMARY KEY,
    image_id    INTEGER,
    item_id     INTEGER,
    FOREIGN KEY (image_id)
        REFERENCES image (id)
            ON DELETE CASCADE
            ON UPDATE NO ACTION,
    FOREIGN KEY (item_id)
        REFERENCES item (id)
            ON DELETE CASCADE
            ON UPDATE NO ACTION

);

-- virtual table used for full-text search
CREATE VIRTUAL TABLE item_fts USING fts5 (
    name,
    description,
    content=item
);

CREATE TRIGGER item_fts_insert AFTER INSERT ON item
BEGIN
    INSERT INTO item_fts (rowid, name, description) VALUES (new.rowid, new.name, new.description);
END;

CREATE TRIGGER item_fts_delete AFTER DELETE ON item
BEGIN
    INSERT INTO item_fts (item_fts, rowid, name, description) VALUES ('delete', old.rowid, old.name, old.description);
END;

CREATE TRIGGER item_fts_update AFTER UPDATE ON item
BEGIN
    INSERT INTO item_fts (item_fts, rowid, name, description) VALUES ('delete', old.rowid, old.name, old.description);
    INSERT INTO item_fts (rowid, name, description) VALUES (new.rowid, new.name, new.description);
END;
