const express = require('express');
const fileUpload = require('express-fileupload');
const SQL = require('sql-template-strings');
const sharp = require('sharp');

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
    // make sure we always work with an array, even if only one file is uploaded
    if (!Array.isArray(uploadImage)) {
        uploadImage = [uploadImage];
    }

    log(`Upload complete from ${req.ip}. Uploaded ${uploadImage.length} file(s).`);
    const db = await getDb();
    const imageIds = [];
    try {
        for (const rawImage of uploadImage) {
            const image = await sharp(rawImage.data)
                .rotate()
                .resize({
                    width: 1300,
                    fit: 'contain',
                    withoutEnlargement: true,
                })
                .jpeg({ mozjpeg: true, chromaSubsampling: '4:4:4' })
                .toBuffer();
            log('Rotate, resize and convert to JPG done.');
            const thumbnail = await sharp(rawImage.data)
                .rotate()
                .resize({
                    width: 256,
                    fit: 'contain',
                    withoutEnlargement: true,
                })
                .jpeg({ mozjpeg: true, chromaSubsampling: '4:4:4' })
                .toBuffer();
            log('Thumbnail rotate, resize and convert to JPG done.');
            const { lastID } = await db.run(
                'INSERT INTO image (image, thumbnail) VALUES(?, ?);',
                image,
                thumbnail
            );
            log('Inserted new image. ID:', lastID);
            imageIds.push(lastID);
        }
    } catch (e) {
        error(e);
        return res
            .status(500)
            .send('SQL error. Please see logs for more details');
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
        error(error);
        return res
            .status(500)
            .send('SQL error. Please see logs for more details');
    }
    if (!result) {
        res.status(404).send('File not found');
        return;
    }
    res.header('Content-Type', 'image/jpeg');
    res.end(result.image);
});

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.get('/:imageId/thumbnail', async (req, res) => {
    const imageId = parseInt(req.params.imageId, 10);
    if (Number.isNaN(imageId)) {
        log('Wrong id sent', req.param.imageId);
        return res.status(400).send('Wrong param sent');
    }

    const db = await getDb();
    let result;
    try {
        result = await db.get(
            SQL`SELECT thumbnail FROM image WHERE id=${imageId}`
        );
    } catch (e) {
        error(error);
        return res
            .status(500)
            .send('SQL error. Please see logs for more details');
    }
    if (!result) {
        res.status(404).send('File not found');
        return;
    }
    res.header('Content-Type', 'image/png');
    res.end(result.thumbnail);
});

module.exports = router;
