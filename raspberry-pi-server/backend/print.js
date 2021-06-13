const express = require('express');
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');

const { log } = require('./helper/util');
const { print, rm } = require('./helper/bashActions');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.uploadAndPrint = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        log('No files were uploaded');
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "fileToPrint") is used to retrieve
    // the uploaded file
    let fileToPrint = req.files.fileToPrint;
    if (Array.isArray(fileToPrint)) {
        fileToPrint = fileToPrint[0];
    }
    log('from ip', req.ip, 'upload file', fileToPrint.name);
    const fileParts = fileToPrint.name.split('.');
    let extension = '';
    if (fileParts.length > 0) {
        extension = '.' + fileParts[fileParts.length - 1];
    }
    const uploadPath =
        __dirname + '/tmp/' + uuidv4().replace(/-/g, '') + extension;

    log('move to', uploadPath);
    try {
        await fileToPrint.mv(uploadPath);
    } catch (err) {
        log(err);
        return res.status(500).send(err);
    }

    log('start print job');
    try {
        await print(uploadPath);
    } catch (err) {
        log(err);
        await rm(uploadPath);
        return res.status(500).send(err);
    }

    log('remove tmp file');
    await rm(uploadPath);

    res.sendFile(__dirname + '/html/print-completed.html');
};
