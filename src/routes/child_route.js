'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/child_controller')

const multer = require('multer');
const multerConfig = require('../config/multer');

router.post('/', multer(multerConfig).single("file"), controller.post);
router.get('/', controller.get);
router.get('/:id', controller.getById);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;