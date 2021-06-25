const router = require('express').Router();

router.use('/image', require('./image'));
router.use('/storage', require('./storage'));
router.use('/section', require('./section'));

module.exports = router;
