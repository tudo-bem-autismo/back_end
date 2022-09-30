'use strict';

const prisma = require('../prismaClient');

exports.post = (req, res) => {

    const data = req.body;

    prisma.tbl_mini_Jogo.create({

        data,
        select:{

            id: true

        }
    
    }).then(

        (data) =>{

            res.status(200).json(data);
        }
    
    ).catch(

        (error) =>{

            if(error.code == "P2000"){

                res.status(500).json({message: `A quantidade máxima de caracteres foi ultrapassada no campo ${error.meta.column_name}.`})

            }else{

                const argument = error.message.split('Argument')[1]

                if(argument){

                    const err = argument.split('\n')[0]

                    res.status(400).json({"message" : err});

                }else{

                    res.status(500).json({"message" : error});

                }   
            }
        }
    );
}