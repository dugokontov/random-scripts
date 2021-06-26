const express = require('express');
const { SQLStatement } = require('sql-template-strings');
const SQL = require('sql-template-strings');

const getDb = require('../helper/db');
const { log } = require('../helper/util');

const router = express.Router();
router.use(express.json());

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.get('/', async (req, res) => {
    const storageId = parseInt(req.query.storageId, 10);
    if (Number.isNaN(storageId)) {
        log('Wrong storageId sent', req.param.storageId);
        return res
            .status(400)
            .send('param storageId is required and has to be number');
    }
    const sectionId = parseInt(req.query.sectionId, 10);

    /** @type {SQLStatement} */
    const query = SQL`
    SELECT i.id, i.section_id, i.name, i.description,
        (SELECT group_concat(image_id) from item_image ii where ii.item_id = i.id) as image_ids
    FROM item i
    LEFT JOIN section s on s.id = i.section_id
    WHERE s.storage_id = ${storageId}`;

    if (!Number.isNaN(sectionId)) {
        query.append(SQL` and i.section_id = ${sectionId}`);
    }

    const db = await getDb();
    /** @type {{id: number, section_id: number, name: string, description: string, image_ids: string | undefined}[]} */
    let results;
    try {
        results = await db.all(query);
    } catch (error) {
        throw new Error(error);
    }
    const resultsToReturn = results.map((row) => ({
        id: row.id,
        sectionId: row.section_id,
        name: row.name,
        description: row.description,
        imageIds: row.image_ids?.split(',').map(Number) ?? [],
    }));
    res.status(200).json(resultsToReturn);
});

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.post('/', async (req, res) => {
    /** @type {{sectionId: string, name: string, description: string, imageIds: string}} */
    const { sectionId, name, description, imageIds } = req.body;
    const numberImageIds = imageIds
        .split(',')
        .filter((a) => a.trim())
        .map(Number);
    // TODO check all fields
    const db = await getDb();
    let itemId;
    // insert item
    try {
        const { lastID } = await db.run(
            SQL`
            INSERT INTO item (section_id, name, description)
            VALUES (${sectionId}, ${name}, ${description})`
        );
        itemId = lastID;
    } catch (error) {
        throw new Error(error);
    }
    // add images
    try {
        if (numberImageIds.length) {
            /** @type {SQLStatement} */
            const query = SQL`INSERT INTO item_image (item_id, image_id) VALUES`;
            numberImageIds.forEach((imageId, index) => {
                if (index !== 0) {
                    query.append(SQL`,`);
                }
                query.append(SQL`(${itemId}, ${imageId})`);
            });
            await db.run(query);
        }
    } catch (error) {
        throw new Error(error);
    }
    res.status(200).json({
        id: itemId,
        sectionId: +sectionId,
        name,
        description,
        imageIds: numberImageIds,
    });
});

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.delete('/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId, 10);
    if (Number.isNaN(itemId)) {
        log('Wrong id sent', req.param.itemId);
        return res.status(400).send('Wrong param sent');
    }
    const db = await getDb();
    try {
        /** @type {{image_id: number}[]} */
        const resultImageIds = await db.all(SQL`
            SELECT image_id
            FROM item_image
            WHERE item_id = ${itemId}`);
        const imageIds = resultImageIds.map((row) => row.image_id);
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
        await db.run(SQL`
            DELETE FROM item
            WHERE id = ${itemId}`);
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
    res.status(204).send();
});

module.exports = router;