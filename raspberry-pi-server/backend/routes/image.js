const express = require('express');
const fileUpload = require('express-fileupload');
const SQL = require('sql-template-strings');

const getDb = require('../helper/db');
const { log } = require('../helper/util');

const router = express.Router();

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.post('/', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        log('No files were uploaded');
        return res.status(400).send('No files were uploaded.');
    }

    let uploadImage = req.files.uploadImage;

    // when only one file is uplaoded express-fileupload treat that as an
    // object. If more than one, then an array.
    // make sure we always work with an array, even if only one file us uploaded
    if (!Array.isArray(uploadImage)) {
        uploadImage = [uploadImage];
    }

    const db = await getDb();
    const imageIds = [];
    try {
        for (const image of uploadImage) {
            const { lastID } = await db.run(
                'INSERT INTO image (image) VALUES(?);',
                image.data
            );
            log('Inserted new image. ID:', lastID);
            imageIds.push(lastID);
        }
    } catch (error) {
        throw new Error(error);
    }

    res.status(200).json({ imageIds });
});

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.get('/:imageId', async (req, res) => {
    const imageId = parseInt(req.params.imageId, 10);
    if (Number.isNaN(imageId)) {
        log('Wrong id sent', req.param.imageId);
        return res.status(400).send('Wrong param sent');
    }

    const db = await getDb();
    let result;
    try {
        result = await db.get(SQL`SELECT image FROM image WHERE id=${imageId}`);
    } catch (e) {
        throw new Error(e);
    }
    if (!result) {
        res.status(404).send('File not found');
        return;
    }
    res.header('Content-Type', 'image/jpeg');
    res.end(result.image);
});

module.exports = router;
