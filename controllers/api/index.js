const router = require('express').Router();
const userRoutes = require('./userRoutes');
const questionRoutes = require('./questionRoutes');

router.use('/Users', userRoutes);
router.use('/questions', questionRoutes);

module.exports = router;
