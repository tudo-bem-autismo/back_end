'use strict';

const prisma = require('../prismaClient');

exports.get = async (req, res, next) => {

    const data = req.body;

    const goldMedals = await prisma.tbl_medalha_crianca.count({
        where:{
            id_crianca: parseInt(data.id_crianca),
            id_medalha: 1

        },
        where:{
            id_crianca: parseInt(data.id_crianca),
            id_medalha: 2

        },
        where:{
            id_crianca: parseInt(data.id_crianca),
            id_medalha: 3
        }
    }).then(

        (data) =>{

            console.log(data)
        }
    ).catch(

        (err) =>{

            console.log(err)
        }
    )
}