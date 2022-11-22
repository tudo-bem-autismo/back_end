'use strict';

const express = require('express');
const router = express.Router();
const firebase = require("../../services/firebase");
const controller = require('../controllers/controllerIcone');

const multer = require("multer");
const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 5 * 1024 * 1024,
});

router.post('/', Multer.single("arquivo"), firebase.uploadImage, controller.post);
router.get('/', controller.get);

module.exports = router;