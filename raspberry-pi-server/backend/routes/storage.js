const express = require('express');
const SQL = require('sql-template-strings');

const getDb = require('../helper/db');
const { log, error } = require('../helper/util');
const { deleteStorageImage, getStorageImageId } = require('../helper/image');

const router = express.Router();
router.use(express.json());

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.get('/', async (req, res) => {
    const db = await getDb();
    let results = [];
    try {
        results = await db.all('select id, name, image_id from storage');
    } catch (e) {
        error(e);
        return res.status(500).send('SQL error. See logs for more details');
    }
    const resultsToReturn = results.map((row) => ({
        id: row.id,
        name: row.name,
        imageId: row.image_id,
    }));
    res.status(200).json(resultsToReturn);
});

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.post('/', async (req, res) => {
    /** @type {{name: string, imageId: number}} */
    const { name, imageId } = req.body;
    // TODO check all fields
    const db = await getDb();
    let storageId;
    try {
        const { lastID } = await db.run(
            SQL`
            INSERT INTO storage (name, image_id)
            VALUES (${name.trim()}, ${imageId})`
        );
        storageId = lastID;
    } catch (e) {
        error(e);
        return res.status(500).send('SQL error. See logs for more details');
    }
    res.status(200).json({
        id: storageId,
        name,
        imageId,
    });
});

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        log('Wrong id sent', req.params.id);
        return res.status(400).send('Wrong param sent.');
    }
    const db = await getDb();
    /** @type {{ id: number, name: string, image_id: number }} */
    let result;
    try {
        result = await db.get(
            SQL`select id, name, image_id from storage where id=${id}`
        );
    } catch (e) {
        error(e);
        return res.status(500).send('SQL error. See logs for more details');
    }
    if (!result) {
        return res.status(404).send('Storage with provided id not found');
    }
    const resultToReturn = {
        id: result.id,
        name: result.name,
        imageId: result.image_id,
    };
    res.status(200).json(resultToReturn);
});

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.delete('/:storageId', async (req, res) => {
    const storageId = parseInt(req.params.storageId, 10);
    if (Number.isNaN(storageId)) {
        log('Wrong id sent', req.params.storageId);
        return res.status(400).send('Wrong param sent');
    }
    const db = await getDb();
    try {
        /** @type {number | null} */
        const result = await getStorageImageId(db, storageId);

        if (!result) {
            // resource doesn't exist. Probably already deleted.
            return res.status(204).send();
        }

        await deleteStorageImage(db, result.image_id);

        await db.run(SQL`
            DELETE FROM storage
            WHERE id = ${storageId}`);
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
router.patch('/:storageId', async (req, res) => {
    const storageId = parseInt(req.params.storageId, 10);
    if (Number.isNaN(storageId)) {
        log('Wrong id sent', req.params.storageId);
        return res.status(400).send('Wrong param sent');
    }
    /** @type {{name: string | undefined, imageId: number | undefined}} */
    const { name, imageId } = req.body;
    // TODO check all fields
    const db = await getDb();
    /** @type {number} */
    let oldImageId;
    try {
        oldImageId = await getStorageImageId(db, storageId);
    } catch (e) {
        error(e);
        return res.status(500).send('SQL error. See logs for more details');
    }
    if (!oldImageId) {
        return res.status(404).send('Storage with provided id not found');
    }

    try {
        await db.run(SQL`
            UPDATE storage
            SET name     = COALESCE(${name}, name),
                image_id = COALESCE(${imageId}, image_id)
            WHERE id = ${storageId}`);
        if (imageId != null && oldImageId !== imageId) {
            await deleteStorageImage(db, oldImageId);
        }
    } catch (error) {
        error(error);
        return res.status(500).send('SQL error. See logs for more details');
    }

    /** @type {{ id: number, name: string, image_id: number }} */
    let result;
    try {
        result = await db.get(
            SQL`select id, name, image_id from storage where id=${storageId}`
        );
    } catch (e) {
        error(e);
        return res.status(500).send('SQL error. See logs for more details');
    }

    const resultToReturn = {
        id: result.id,
        name: result.name,
        imageId: result.image_id,
    };
    res.status(200).json(resultToReturn);
});

module.exports = router;
