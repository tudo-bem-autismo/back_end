'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllerMiniJogo');
const uploadImage = require('../../services/firebase')
const routerSituacaoEscolha = require('./routesSituacaoEscolha')

const multer = require('multer');
const { memoryStorage, } = require('multer');

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

router.post('/', Multer.single('icone'), controller.post)
router.get('/', controller.get)

module.exports = router;