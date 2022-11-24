'use strict';

const prisma = require('../prismaClient');

exports.post = async (req, res, next) => {

    const data = req.body
    let children = null
    let days = null

    if (typeof (data.id_crianca) == 'object')
        children = data.id_crianca.map(id => { return { id_crianca: parseInt(id) } })
    else
        children = { id_crianca: parseInt(data.id_crianca) }

    if (typeof (data.id_dia_semana) == 'object')
        days = data.id_dia_semana.map(id => { return { id_dia_semana: parseInt(id) } })
    else
        days = { id_dia_semana: parseInt(data.id_dia_semana) }

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
    }).then((tarefa) => { res.status(201).json(tarefa) }
    ).catch((error) => { res.status(500).json({ "message": error }) })
}

exports.get = async (req, res) => {

    try{

        const id = req.params.id
    
        const result = await prisma.$queryRaw `select 
            tbl_tarefa.id as id_tarefa,
            tbl_tarefa.horario,
            tbl_tarefa.titulo,
            tbl_dia_semana.id as id_dia_semana,
            tbl_dia_semana.dia,
            tbl_dia_semana.sigla,
            tbl_icone.icone,
            tbl_icone.titulo,
            (select if(tbl_dia_semana.numero = (dayofWeek(current_timestamp())), 'true', 'false')) as hoje
        from tbl_tarefa
            inner join tbl_tarefa_dia_semana
                on tbl_tarefa.id = tbl_tarefa_dia_semana.id_tarefa
            inner join tbl_dia_semana
                on tbl_tarefa_dia_semana.id_dia_semana = tbl_dia_semana.id
            inner join tbl_icone
                on tbl_tarefa.id_icone = tbl_icone.id
            inner join tbl_crianca_tarefa
                on tbl_tarefa.id = tbl_crianca_tarefa.id_tarefa
            inner join tbl_crianca
                on tbl_crianca_tarefa.id_crianca = tbl_crianca.id
        where tbl_crianca.id = ${id};`

        res.status(200).send(result)

    }catch(error){
        const e = new Error(error)
        res.status(500).json(e.message)
    }
}

exports.getById = (req, res, next) => {

    const id = parseInt(req.params.id);

   prisma.tbl_tarefa.findUnique({

        where:{
            id: id
        },
        include:{
            tbl_crianca_tarefa:{
                include:{
                    tbl_crianca:true
                }
            },
            tbl_tarefa_dia_semana:{
                include:{
                    tbl_dia_semana:true
                }
            },
            tbl_icone:true
        }
    }).then((tarefa) => { res.status(201).json(tarefa) }
    ).catch((error) => { console.log(error)})
}

exports.delete = (req, res) => {

    const id = parseInt(req.params.id);
    
    prisma.tbl_tarefa.delete({
        where:{
            id: id
        }
    }).then(() => res.status(200).json({}))
    .catch((error) => res.status(500).json({error}))

}