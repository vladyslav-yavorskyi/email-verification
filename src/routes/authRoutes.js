const express = require('express');
const router = express.Router();
const { register, verificate } = require('../controllers/authController');

router.post('/register', register);
router.get('/verificate/:email/:token', verificate);

module.exports = router;
