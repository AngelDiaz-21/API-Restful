const express = require('express');
const authenticate = require('../middlewares/authentication');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/users', authenticate, require('./users'));
router.use('/products', authenticate, require('./products'));
router.use('/reviews', authenticate, require('./reviews'));
router.use('/orders', authenticate, require('./orders'));

module.exports = router;