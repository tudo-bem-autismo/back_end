'use strict';

const prisma = require('../prismaClient');

exports.post = (req, res, next) => {

    const data = req.body;

    prisma.tbl_tarefa.create({
        data:{
            horario: data.horario,
            titulo: data.titulo,
            id_icone: parseInt(data.id_icone)
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

    prisma.tbl_tarefa.findMany({

        include:{
            tbl_icone: true
        }

    }).then(

        (data) => {
            console.log(data);

            res.status(200).json(data);
        }
    )
    .catch(

        (error) => {

            res.status(500).json({ "message": error })
        }
    )
}