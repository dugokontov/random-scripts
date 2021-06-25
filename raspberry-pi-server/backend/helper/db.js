const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

sqlite3.verbose();

async function getDb() {
    return await sqlite.open({
        filename: './master.db',
        driver: sqlite3.cached.Database,
    });
}

module.exports = getDb;
