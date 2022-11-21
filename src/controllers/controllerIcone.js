'use strict';

const prisma = require('../prismaClient');

exports.post = (req, res, next) => {

    const data = req.body;

    prisma.tbl_icone.create({
        data:{
            icone: data.icone,
            titulo: data.titulo
        },
        select:{
            id: true
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