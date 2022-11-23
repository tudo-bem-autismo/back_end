'use strict';

const prisma = require('../prismaClient');

exports.post = async (req, res, next) => {

    const data = req.body
    // console.log(typeof(data.id_crianca.length()))
    
    if(typeof(data.id_crianca) == 'object'){
        console.log(data)
    }
    



    prisma.tbl_tarefa.create({
        data: {
            titulo: data.titulo,
            horario: data.horario,
            id_icone: parseInt(data.id_icone),
            tbl_crianca_tarefa: {
                createMany: {
                    id_crianca: parseInt(data.id_crianca)
                }
            },
            tbl_tarefa_dia_semana: {
                create: {
                    id_dia_semana: parseInt(data.id_dia_semana)
                }
            }
        },
        select: {
            id: true
        }
    }).then(
        (tarefa) => {
            res.status(201).json(tarefa);
        }
    ).catch(
        (error) => {
            console.log(error)
            res.status(500).json({ "message": error })
        }
    )
}

exports.get = (req, res) => {

    const id_crianca = req.params.id;

    prisma.tbl_crianca_tarefa.findMany({
        where: {
            id_crianca: parseInt(id_crianca)
        },
        include: {
            tbl_tarefa:{
                include:{
                    tbl_icone: true,
                    tbl_tarefa_dia_semana:{
                        include:{
                            tbl_dia_semana:true
                        }
                    }
                }
            }
        }
    }).then(
        (data) => {
            res.status(200).json(data);
        }
    )
        .catch(
            (error) => {
                console.log(error)
                res.status(500).json({ "message": error })
            }
        )
}

exports.getById = (req, res, next) => {

    const prisma = require('../prismaClient');

    const id = req.params.id;

    prisma.tbl_crianca_tarefa.findUnique({
        where: {
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

            res.status(400).json({ "message": err });
        }
    );
}