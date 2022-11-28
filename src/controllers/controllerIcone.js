'use strict';

const prisma = require('../prismaClient');

exports.post = (req, res, next) => {

    const data = req.body;
    
    const icones = data.icones.map((icone) => {

        prisma.tbl_icone.createMany({
            data:{
                icone: icone.icone,
                titulo: icone.titulo
            }
        }).then(
            (data) =>{
                res.status(200).json(data);
            }
        ).catch(
            (error) => {
                // console.log(error);
                res.status(500).json({ "message": error });
            }
        )
    }) 
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