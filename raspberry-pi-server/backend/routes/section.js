const express = require('express');
const SQL = require('sql-template-strings');

const getDb = require('../helper/db');
const { log, error } = require('../helper/util');

const router = express.Router();

router.use(express.json());

/**
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
    const db = await getDb();
    /** @type {{ id: number, name: string, position: string }[]} */
    let results;
    try {
        results = await db.all(
            SQL`
            SELECT id, name, position
            FROM section
            WHERE storage_id=${storageId}`
        );
    } catch (e) {
        error(e);
        return res.status(500).send('SQL error. See logs for more details');
    }
    const resultsToReturn = results.map((row) => ({
        id: row.id,
        storageId,
        name: row.name,
        position: JSON.parse(row.position),
    }));
    res.status(200).json(resultsToReturn);
});

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.post('/', async (req, res) => {
    const { name, storageId, position } = req.body;
    const [left, top, width, height] = position;
    // TODO check all fields
    const db = await getDb();
    let sectionId;
    try {
        const { lastID } = await db.run(
            SQL`
            INSERT INTO section (storage_id, name, position)
            VALUES (${storageId}, ${name.trim()}, ${JSON.stringify(position)})`
        );
        sectionId = lastID;
    } catch (e) {
        error(e);
        return res.status(500).send('SQL error. See logs for more details');
    }
    res.status(200).json({
        id: sectionId,
        name,
        storageId: +storageId,
        position,
    });
});
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.delete('/:sectionId', async (req, res) => {
    const sectionId = parseInt(req.params.sectionId, 10);
    if (Number.isNaN(sectionId)) {
        log('Wrong id sent', req.params.sectionId);
        return res.status(400).send('Wrong param sent');
    }
    // TODO: check that all items are removed first
    const db = await getDb();
    try {
        await db.run(SQL`
        DELETE FROM section
        WHERE id = ${sectionId}`);
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
router.patch('/:sectionId', async (req, res) => {
    const sectionId = parseInt(req.params.sectionId, 10);
    if (Number.isNaN(sectionId)) {
        log('Wrong id sent', req.params.sectionId);
        return res.status(400).send('Wrong param sent');
    }
    /** @type {{name: string | undefined, position: [number, number, number, number] | undefined}} */
    const { name, position } = req.body;
    // TODO check all fields
    const db = await getDb();

    try {
        let positionPayload = undefined;
        if (position) {
            positionPayload = JSON.stringify(position);
        }
        await db.run(SQL`
            UPDATE section
            SET name     = COALESCE(${name}, name),
                position = COALESCE(${positionPayload}, position)
            WHERE id = ${sectionId}`);
    } catch (e) {
        error(e);
        return res.status(500).send('SQL error. See logs for more details');
    }

    /** @type {{ id: number, storage_id: number, name: string, position: string }} */
    let result;
    try {
        result = await db.get(
            SQL`select id, storage_id, name, position from section where id=${sectionId}`
        );
    } catch (e) {
        error(e);
        return res.status(500).send('SQL error. See logs for more details');
    }
    const resultToReturn = {
        id: result.id,
        storageId: result.storage_id,
        name: result.name,
        position: JSON.parse(result.position),
    };
    res.status(200).json(resultToReturn);
});

module.exports = router;
