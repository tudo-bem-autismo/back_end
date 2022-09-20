'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllerCrianca')

const multer = require('multer');
// const multerConfig = require('../config/multer');
const { memoryStorage } = require('multer');

const Multer = multer({
    storage: memoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

router.post('/', Multer.single("arquivo"), controller.post);
router.get('/', controller.get);
router.get('/:id', controller.getById);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;