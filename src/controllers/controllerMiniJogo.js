'use strict';

const multer = require('multer');
const prisma = require('../prismaClient');

exports.post = (req, res, next) => {

    // const Multer = multer({
    //     storage: multer.memoryStorage(),
    //     limits: {
    //         fileSize: 5 * 1024 * 1024
    //     }
    // });

    const upload = require("../../services/firebase");

    let data = req.body;
    const image = req.file;
    
    const icone = upload.uploadImages(image);
    console.log(icone)
    // console.log(data.tbl_passo[0]['dialogo'])
    // console.log(images)

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

    prisma.tbl_mini_jogo.findMany({

        include:{
            tbl_situacao_escolha: {
                include: {
                    tbl_passo_tbl_passoTotbl_situacao_escolha_id_passo_correto: true,
                    tbl_passo_tbl_passoTotbl_situacao_escolha_id_passo_errado: true
                }
            }
        }
    })
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

        include:{
            tbl_situacao_escolha: {
                include: {
                    tbl_passo_tbl_passoTotbl_situacao_escolha_id_passo_correto: true,
                    tbl_passo_tbl_passoTotbl_situacao_escolha_id_passo_errado: true
                }
            }
        }
    })
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