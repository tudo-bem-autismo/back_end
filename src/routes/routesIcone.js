'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllerIcone');

const multer = require("multer");

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 5 * 1024 * 1024,
});

router.post('/', Multer.any(), controller.post);
router.get('/', controller.get);

module.exports = router;