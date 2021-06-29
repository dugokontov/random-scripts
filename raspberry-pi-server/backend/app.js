const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

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

app.use('/app', express.static(path.join(__dirname, '../frontend/build')));
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
app.get('/app*', (req, res) => {
    // path.resolve is used because /../ is considered malicious
    // https://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error/14594282#14594282
    res.sendFile(path.resolve(__dirname + '/../frontend/build/index.html'));
});

module.exports = app;
