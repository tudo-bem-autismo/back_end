'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllerTarefa');

router.post('/', controller.post);
router.put('/', controller.put);
router.get('/crianca/:id', controller.get);
router.get('/:id', controller.getById);
router.delete('/:id', controller.delete);

module.exports = router;