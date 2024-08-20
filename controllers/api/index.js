const router = require('express').Router();
const userRoutes = require('./UserRoutes');
const questionRoutes = require('./questionRoutes');

router.use('/Users', userRoutes);
router.use('/questions', questionRoutes);

module.exports = router;
