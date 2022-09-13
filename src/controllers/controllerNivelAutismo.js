'use strict';

exports.get = async (req, res, next) =>{

    const model = require('../models/modelNivelAutismo')

    const data = await model.getAllNiveis();

    res.status(200).send(data);

};

exports.getById = (req, res, next) =>{

    const prisma = require('../prismaClient');

    const id = req.params.id;

    const data = prisma.tbl_nivel_autismo.findUnique({

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

};