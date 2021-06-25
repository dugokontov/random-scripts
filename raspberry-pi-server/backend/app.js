const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const print = require('./print');
const { log } = require('./helper/util');

const app = express();

app.use(fileUpload());

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});

app.post('/print', print.uploadAndPrint);

app.use('/api', cors({ credentials: true }));
app.use('/api', require('./routes'));

module.exports = app;
