'use strict';

// exports.post = (req, res, next) =>{

//     res.status(201).send(req.body);
// };

// exports.put = (req, res, next) =>{

//     const id = req.params.id;
//     res.status(200).send({
//         id: id,
//         item: req.body
//     });
// };

// exports.delete = (req, res, next) =>{

//     const id = req.params.id;
//     res.status(200).send({
//         id: id,
//         item: req.body
//     });
// };

exports.get = async (req, res, next) =>{

    const model = require('../models/modelGenero')

    const data = await model.getAllGeneros();

    res.status(200).send(data)

};

exports.getById = (req, res, next) =>{

    const prisma = require('../prismaClient');

    const id = req.params.id;

    const data = prisma.tbl_genero.findUnique({

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