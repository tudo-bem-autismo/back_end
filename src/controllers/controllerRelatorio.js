'use strict';

const prisma = require('../prismaClient');

exports.post = (req, res, next) => {

    const data = req.body.data;

    prisma.tbl_relatorio.create({
        
        data:{
            acertos: data.acertos,
            erros: data.erros,
            data: new Date( data.data ),
            id_crianca: parseInt(data.id_crianca),
            id_mini_jogo: parseInt(data.id_mini_jogo)
        },
        select:{
            id: true
        }

    }).then(

        (data) => {

            res.status(200).json({id: data})
        }
    
    ).catch(

        (err) => {

            console.log(err)
            
            res.status(500).json({message: err})
            
        }
    )
}