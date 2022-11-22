'use strict';

const prisma = require('../prismaClient');

exports.post = (req, res, next) => {

    const data = req.body

    prisma.tbl_crianca_tarefa.create({
        data:{
            id_crianca: parseInt(data.id_crianca),
            tbl_tarefa:{
                
            }
           
        }
    }).then(
        (tarefa) => {
            res.status(201).json(tarefa);
        }
    ).catch(
        (error) => {
            res.status(500).json({ "message": error })
        }
    )
}

exports.get = (req, res) =>{

    const id_crianca = req.params.id;

    prisma.tbl_crianca_tarefa.findMany({
        where:{
            id_crianca: parseInt(id_crianca)
        },
        include:{
            tbl_tarefa: true,
            tbl_icone: true,
            tbl_dia_semana: true
        }
    }).then(
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

exports.getById = (req, res, next) =>{

    const prisma = require('../prismaClient');

    const id = req.params.id;

    prisma.tbl_crianca_tarefa.findUnique({
        where:{
            id: parseInt(id)
        }
    }).then(
        (data) => {
            res.status(200).send(data);
        }
    ).catch(
        (error) => {
            const argument = error.message.split('Argument')[1]
            const err = argument.split('\n')[0]

            res.status(400).json({"message" : err});
        }
    );
}