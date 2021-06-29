const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

sqlite3.verbose();

async function getDb() {
    const pathToDb = path.resolve(__dirname + '/../master.db');
    return await sqlite.open({
        filename: pathToDb,
        driver: sqlite3.cached.Database,
    });
}

module.exports = getDb;
