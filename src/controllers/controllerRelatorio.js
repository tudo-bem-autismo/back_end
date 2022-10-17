'use strict';

const { raw } = require('@prisma/client/runtime');
const prisma = require('../prismaClient');

exports.post = (req, res, next) => {

    const data = req.body;

    prisma.tbl_relatorio.create({
        
        data:{
            acertos: data.acertos,
            erros: data.erros,
            data: new Date(data.data),
            id_crianca: parseInt(data.id_crianca),
            id_mini_jogo: parseInt(data.id_mini_jogo)
        },
        select:{
                id: true
        }

    }).then(

        (data) => {

            res.status(200).json(data)
        }
    
    ).catch(

        (err) => {
            
            res.status(500).json({message: err})
            
        }
    )
}

exports.get = (req, res, next) => {

    const data = req.body;

    const date = new Date()
    date.setDate(date.getDate() - parseInt(data.periodo))

    prisma.tbl_relatorio.findMany({
        where:{

            id_crianca: parseInt(data.id_crianca),
            id_mini_jogo: parseInt(data.id_mini_jogo),
            data: {
                gte : date
            }
        }

    }).then(

        (result) => {

            res.status(200).json(result)
        }
    
    ).catch(

        (err) => {

            console.log(err)
            
            res.status(500).json({message: err})
            
        }
    )

}