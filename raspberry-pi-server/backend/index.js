const app = require('./app');
const { log } = require('./helper/util');

const PORT = 3000;

app.listen(PORT, () => {
    log(`Listening at http://localhost:${PORT}`);
});
