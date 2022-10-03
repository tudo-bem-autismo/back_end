'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllerMiniJogo');
const uploadImage = require("../../services/firebase")

const multer = require('multer');
// const multerConfig = require('../config/multer');
const { memoryStorage, } = require('multer');

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

// router.post('/', Multer.fields([{
//     name: 'icone',
//     maxCount: 1},{
//     name: 'imagem_fundo',
//     maxCount: 1    
//     },{
//     name: 'tbl_passo[*][imagem]',
//     maxCount: 100
//     }]), controller.post);

router.get('/', controller.get)

router.post('/', Multer.any(), controller.post);

module.exports = router;