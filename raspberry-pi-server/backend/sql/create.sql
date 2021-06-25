CREATE TABLE image (
    id          INTEGER NOT NULL PRIMARY KEY,
    image       BLOB
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

)
