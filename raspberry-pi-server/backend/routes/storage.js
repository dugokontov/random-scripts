const express = require('express');
const SQL = require('sql-template-strings');

const getDb = require('../helper/db');
const { log } = require('../helper/util');

const router = express.Router();

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.get('/', async (req, res) => {
    const db = await getDb();
    let results = [];
    try {
        results = await db.all('select id, name, image_id from storage');
    } catch (error) {
        throw new Error(error);
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
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        log('Wrong id sent', req.param.id);
        return res.status(400).send('Wrong param sent.');
    }
    const db = await getDb();
    let result;
    try {
        result = await db.get(
            SQL`select id, name, image_id from storage where id=${id}`
        );
    } catch (error) {
        throw new Error(error);
    }
    if (!result) {
        return res.status(404).send();
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
        log('Wrong id sent', req.param.storageId);
        return res.status(400).send('Wrong param sent');
    }
    const db = await getDb();
    try {
        /** @type {{image_id: number}} */
        const resultImageId = await db.get(SQL`
            SELECT image_id
            FROM storage
            WHERE id = ${storageId}`);

        await db.run(SQL`
            DELETE FROM image
            WHERE id = ${resultImageId.image_id}`);

        await db.run(SQL`
            DELETE FROM storage
            WHERE id = ${storageId}`);
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
    res.status(204).send();
});

module.exports = router;
