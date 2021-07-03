const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const { SQLStatement } = require('sql-template-strings');
const SQL = require('sql-template-strings');

/**
 * @param {Promise<sqlite.Database<sqlite3.Database, sqlite3.Statement>>} db
 * @param {number} itemId
 * @param {number[]} imageIds
 */
exports.addItemImages = async (db, itemId, imageIds) => {
    if (!imageIds.length) {
        return;
    }
    /** @type {SQLStatement} */
    const query = SQL`INSERT INTO item_image (item_id, image_id) VALUES`;
    imageIds.forEach((imageId, index) => {
        if (index !== 0) {
            query.append(SQL`,`);
        }
        query.append(SQL`(${itemId}, ${imageId})`);
    });
    await db.run(query);
};

/**
 * @param {Promise<sqlite.Database<sqlite3.Database, sqlite3.Statement>>} db
 * @param {number[]} imageIds
 */
exports.deleteItemImages = async (db, imageIds) => {
    if (!imageIds.length) {
        return;
    }
    const deleteItemImageQuery = SQL`
        DELETE FROM item_image
        WHERE 1 = 2`;
    imageIds.forEach((imageId) =>
        deleteItemImageQuery.append(SQL` OR image_id = ${imageId}`)
    );
    await db.run(deleteItemImageQuery);
    const deleteImageQuery = SQL`
        DELETE FROM image
        WHERE 1 = 2`;
    imageIds.forEach((imageId) =>
        deleteImageQuery.append(SQL` OR id = ${imageId}`)
    );
    await db.run(deleteImageQuery);
};

/**
 * @param {Promise<sqlite.Database<sqlite3.Database, sqlite3.Statement>>} db
 * @param {number} itemId
 */
exports.getImageIdsForItem = async (db, itemId) => {
    /** @type {{image_id: number}[]} */
    const resultImageIds = await db.all(SQL`
        SELECT image_id
        FROM item_image
        WHERE item_id = ${itemId}`);

    return resultImageIds.map((row) => row.image_id);
};

/**
 * @param {Promise<sqlite.Database<sqlite3.Database, sqlite3.Statement>>} db
 * @param {number} imageId
 */
exports.deleteStorageImage = async (db, imageId) => {
    if (!imageId) {
        return;
    }
    await db.run(SQL`
        DELETE FROM image
        WHERE id = ${imageId}`);
};

/**
 * @param {Promise<sqlite.Database<sqlite3.Database, sqlite3.Statement>>} db
 * @param {number} storageId
 */
exports.getStorageImageId = async (db, storageId) => {
    if (!storageId) {
        return null;
    }
    /** @type {{image_id: number}} */
    const result = await db.get(SQL`
        SELECT image_id
        FROM storage
        WHERE id = ${storageId}`);
    if (!result) {
        return null;
    }
    return result.image_id;
};

/**
 * @param {number[]} existingImageIds
 * @param {number[]} newImageIds
 */
exports.getImageDiff = (existingImageIds, newImageIds) => {
    const imageIdsToAdd = newImageIds.filter(
        (imageId) => !existingImageIds.includes(imageId)
    );

    const imageIdsToRemove = existingImageIds.filter(
        (imageId) => !newImageIds.includes(imageId)
    );

    return { imageIdsToAdd, imageIdsToRemove };
};
