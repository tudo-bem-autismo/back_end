'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllerResponsavel');

router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
router.get('/', controller.get);
router.get('/:id', controller.getById);
router.get('/login/email', controller.login)

module.exports = router;