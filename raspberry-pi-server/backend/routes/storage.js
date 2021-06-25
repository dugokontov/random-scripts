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
    const resultToReturn = {
        id: result.id,
        name: result.name,
        imageId: result.image_id,
    };
    res.status(200).json(resultToReturn);
});

module.exports = router;
