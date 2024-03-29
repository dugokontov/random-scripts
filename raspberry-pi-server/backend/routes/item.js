const express = require('express');
const { SQLStatement } = require('sql-template-strings');
const SQL = require('sql-template-strings');

const getDb = require('../helper/db');
const {
    deleteItemImages,
    getImageIdsForItem,
    getImageDiff,
    addItemImages,
} = require('../helper/image');
const { log, error } = require('../helper/util');

const router = express.Router();
router.use(express.json());

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.get('/search', async (req, res) => {
    /** @type {string} */
    let q = req.query.q?.trim();
    q = q.replace(/\//g, ' ');
    if (!q) {
        res.status(200).json([]);
    }

    /** @type {SQLStatement} */
    const query = SQL`
    SELECT
        i.id,
        i.section_id,
        i.name,
        i.description,
        (SELECT group_concat(image_id) from item_image ii where ii.item_id = i.id) as image_ids,
        s.name as section_name,
        st.id as storage_id,
        st.name as storage_name,
        st.image_id as storage_image_id
    FROM item i
    LEFT JOIN section s on s.id = i.section_id
    LEFT JOIN storage st on st.id = s.storage_id
    WHERE i.id IN (SELECT rowid FROM item_fts WHERE item_fts MATCH ${q} ORDER BY rank)`;

    const db = await getDb();
    /**
     * @type {{
     *  id: number,
     *  section_id: number,
     *  name: string,
     *  description: string,
     *  image_ids: string | undefined,
     *  section_name: string,
     *  storage_id: number,
     *  storage_name: string,
     *  image_id: number
     * }[]
     * } */
    let results;
    try {
        results = await db.all(query);
    } catch (e) {
        error(e);
        return res.status(500).send('SQL error. See logs for more details');
    }
    const resultsToReturn = results.map((row) => ({
        id: row.id,
        sectionId: row.section_id,
        name: row.name,
        description: row.description,
        imageIds: row.image_ids?.split(',').map(Number) ?? [],
        sectionName: row.section_name,
        storageId: row.storage_id,
        storageName: row.storage_name,
        imageId: row.image_id,
    }));
    res.status(200).json(resultsToReturn);
});

/**
 * Get list of items based on provided query params: storageId and/or sectionId
 * If sectionId is null it will return all items from storageId
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.get('/', async (req, res) => {
    const storageId = parseInt(req.query.storageId, 10);
    if (Number.isNaN(storageId)) {
        log('Wrong storageId sent', req.params.storageId);
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
        query.append(SQL` AND i.section_id = ${sectionId}`);
    }

    const db = await getDb();
    /** @type {{id: number, section_id: number, name: string, description: string, image_ids: string | undefined}[]} */
    let results;
    try {
        results = await db.all(query);
    } catch (e) {
        error(e);
        return res.status(500).send('SQL error. See logs for more details');
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
            VALUES (${sectionId}, ${name.trim()}, ${description?.trim()})`
        );
        itemId = lastID;
    } catch (e) {
        error(e);
        return res.status(500).send('SQL error. See logs for more details');
    }
    // add images
    try {
        await addItemImages(db, itemId, numberImageIds);
    } catch (e) {
        error(e);
        return res.status(500).send('SQL error. See logs for more details');
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
 * Get one item by itemId
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.get('/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId, 10);
    if (Number.isNaN(itemId)) {
        log('Wrong id sent', req.params.itemId);
        return res.status(400).send('Wrong param sent');
    }
    /** @type {SQLStatement} */
    const query = SQL`
    SELECT i.id, i.section_id, s.storage_id, i.name, i.description,
        (SELECT group_concat(image_id) from item_image ii where ii.item_id = i.id) as image_ids
    FROM item i
    LEFT JOIN section s on s.id = i.section_id
    WHERE i.id = ${itemId}`;

    const db = await getDb();
    /** @type {{id: number, section_id: number, storage_id: number, name: string, description: string, image_ids: string | undefined}} */
    let result;
    try {
        result = await db.get(query);
    } catch (e) {
        error(e);
        return res.status(500).send('SQL error. See logs for more details');
    }
    const resultToReturn = {
        id: result.id,
        sectionId: result.section_id,
        storageId: result.storage_id,
        name: result.name,
        description: result.description,
        imageIds: result.image_ids?.split(',').map(Number) ?? [],
    };
    res.status(200).json(resultToReturn);
});

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.delete('/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId, 10);
    if (Number.isNaN(itemId)) {
        log('Wrong id sent', req.params.itemId);
        return res.status(400).send('Wrong param sent');
    }
    const db = await getDb();
    try {
        const imageIds = await getImageIdsForItem(db, itemId);

        await deleteItemImages(db, imageIds);

        await db.run(SQL`
            DELETE FROM item
            WHERE id = ${itemId}`);
    } catch (e) {
        error(e);
        return res.status(500).send('SQL error. See logs for more details');
    }
    res.status(204).send();
});

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.patch('/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId, 10);
    if (Number.isNaN(itemId)) {
        log('Wrong id sent', req.params.itemId);
        return res.status(400).send('Wrong param sent');
    }
    /** @type {{sectionId: string | null, name: string | null, description: string | null, imageIds: number[] | null}} */
    const { sectionId, name, description, imageIds } = req.body;
    
    const db = await getDb();
    try {
        if (imageIds != null) {
            const existingItemImageIds = await getImageIdsForItem(db, itemId);

            const { imageIdsToAdd, imageIdsToRemove } = getImageDiff(
                existingItemImageIds,
                imageIds
            );

            await deleteItemImages(db, imageIdsToRemove);
            await addItemImages(db, itemId, imageIdsToAdd);
        }

        await db.run(SQL`
            UPDATE item
            SET section_id  = COALESCE(${
                sectionId ? +sectionId : null
            }, section_id),
                name        = COALESCE(${name}, name),
                description = COALESCE(${description}, description)
            WHERE id = ${itemId}`);
    } catch (e) {
        error(e);
        return res.status(500).send('SQL error. See logs for more details');
    }
    res.status(204).send();
});

module.exports = router;
