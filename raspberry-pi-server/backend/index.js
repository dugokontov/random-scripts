const express = require('express');
const fileUpload = require('express-fileupload');

const print = require('./print');
const { log } = require('./helper/util');

const app = express();
const port = 3000;

app.use(fileUpload());

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});

app.post('/print', print.uploadAndPrint);

app.listen(port, () => {
    log(`Listening at http://localhost:${port}`);
});
