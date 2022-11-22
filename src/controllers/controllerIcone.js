'use strict';

const prisma = require('../prismaClient');

exports.post = (req, res, next) => {

    const data = req.body;

    const {firebaseUrl} = req.file ? req.file : "";

    prisma.tbl_icone.create({
        data:{
            icone: firebaseUrl,
            titulo: data.titulo
        },
        select:{
            id: true,
            icone: true
        }
    }).then(
        (icone) => {
            res.status(201).json(icone);
        }
    ).catch(
        (error) => {
            res.status(500).json({ "message": error })
        }
    )
}

exports.get = (req, res) =>{

    prisma.tbl_icone.findMany()
    .then(
        (data) => {
            res.status(200).json(data);
        }
    )
    .catch(
        (error) => {
            res.status(500).json({ "message": error })
        }
    )
}