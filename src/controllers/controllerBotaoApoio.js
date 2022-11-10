'use strict';

const prisma = require('../prismaClient');
const firebase = require('../../services/firebase')

exports.post = (req, res) => {

    try {

        const files = req.files

        const uploads = files.map((file) => {
            return firebase.uploadFiles(file)
        })

        res.status(200).json(uploads)

    } catch (error) {

        throw error
    }
} 