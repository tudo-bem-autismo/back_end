'use strict';

const prisma = require('../prismaClient');

exports.post = async (req, res) => {

    // const files = req.files

    // files.map((file)=>{

    // })

    // 

    try {

        const files = req.files
        // console.log(files)

        files.map((file) => {
            const mimetype = file.mimetype.split('/')[0]
            console.log(mimetype)

            // image
            // image
            // application
            // video
            // audio
        })

    } catch (error) {

        throw error

    }
} 