'use strict';

const prisma = require('../prismaClient');

exports.post = (req, res, next) => {

    const upload = require("../../services/firebase");

    let data = req.body;
    const image = req.file;
    
    const icone = upload.uploadImages(image);

    data['icone'] = icone;

    prisma.tbl_mini_jogo.create({

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

            console.log(error)

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

exports.get = async (req, res, next) =>{

    prisma.tbl_mini_jogo.findMany()
    .then(

        (data) => {

            res.status(200).json(data);
        }
    )
    .catch(

        (error) =>{

            console.log(error)

            res.status(500).json({"message" : error})
        }
    );
}

exports.getById = async (req, res, next) =>{

    const id = req.params.id

    prisma.tbl_mini_jogo.findMany({

        where: {

            id: parseInt(id)

        } ,
        include:{
            tbl_situacao_escolha: {
                include: {
                    tbl_passo: true
                },
                orderBy:{
                    ordem: 'asc'
                }
            },
        },
    })
    .then(

        (data) => {

            const situations = data[0].tbl_situacao_escolha
            const datWithRandomOrderOfSteps = situations.map(

                (situation) => {

                    // situation.tbl_passo.sort(

                    //     (firstStep, secondStep) => {

                    //         const random = Math.floor(Math.random() * (255 - 0) + 0)
                    //         console.log(random)

                    //         if(random >= 127){

                    //             return firstStep
                            
                    //         }else{

                    //             return secondStep
                    //         }
                    //     }
                    // )

                    // situation.tbl_passo.sort(

                    //     (a, b) =>{

                    //         return Math.floor(Math.random() * (255 - 0) + 0)
                    //     }
                        
                    // )

                    return situation
                }
            )

            // console.log(datWithRandomOrderOfSteps)

            res.status(200).json(datWithRandomOrderOfSteps);
        }
    )
    .catch(

        (error) =>{

            console.log(error)

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