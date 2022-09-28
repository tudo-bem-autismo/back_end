'use strict';

// import { getStorage, ref } from "firebase/storage";

const express = require('express');
const router = express.Router();

const uploadImage = require("../../services/firebase");

const controller = require('../controllers/controllerCrianca');

const multer = require("multer");

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 5 * 1024 * 1024,
});

const deleteFile = () => {

    // var storage = firebase.storage();

    // var storageRef = storage.ref();

    var fileUrl = 'gs://tudo-bem-autismo.appspot.com/1663779409240.jpeg';

    // Create a reference to the file to delete
    var fileRef = storage.refFromURL(fileUrl);

    console.log("File in database before delete exists : "
            + fileRef.exists())

    // Delete the file using the delete() method
    fileRef.delete().then(function () {

        // File deleted successfully
        console.log("File Deleted")
    }).catch(function (error) {
        // Some Error occurred
    });

    console.log("File in database after delete exists : "
            + fileRef.exists())
}

router.post('/', Multer.single("arquivo"), uploadImage, controller.post);
router.get('/', controller.get);
router.get('/:id', controller.getById);
router.put('/:id', controller.put);
router.delete('/:id', deleteFile, controller.delete);

module.exports = router;