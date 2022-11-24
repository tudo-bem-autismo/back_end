'use strict';

const prisma = require('../prismaClient');

exports.post = async (req, res, next) => {

    const data = req.body
    let children = null 
    let days = null 
    
    if(typeof(data.id_crianca) == 'object')
        children = data.id_crianca.map( id => {return {id_crianca: parseInt(id)}})
    else
        children = {id_crianca: parseInt(data.id_crianca)}
    

    if(typeof(data.id_dia_semana) == 'object')
        days = data.id_dia_semana.map( id => {return {id_dia_semana: parseInt(id)}})
    else
        days = {id_dia_semana: parseInt(data.id_dia_semana)}
    
    prisma.tbl_tarefa.create({
        data: {
            titulo: data.titulo,
            horario: data.horario,
            id_icone: parseInt(data.id_icone),
            tbl_crianca_tarefa: {
                create: children
            },
            tbl_tarefa_dia_semana: {
                create: days
            }
        }
    }).then((tarefa) => {res.status(201).json(tarefa);}
    ).catch((error) => {res.status(500).json({ "message": error })})
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