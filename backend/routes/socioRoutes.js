
const express = require('express');
const router = express.Router();
const {reservarCancha} = require('../controllers/socioController');

router.post('/', reservarCancha);


module.exports = router;