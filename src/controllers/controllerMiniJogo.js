'use strict';

const prisma = require('../prismaClient');

exports.post = (req, res, next) => {

    const upload = require("../../services/firebase");

    let data = req.body;
    const images = req.files;

    const icone = upload.uploadImages(images.icone[0]);
    const imagemFundo = upload.uploadImages(images.imagem_fundo[0]);
    // console.log(data.tbl_passo[0]['dialogo'])
console.log(req)

    // data['icone'] = icone;
    // data['imagem_fundo'] = imagemFundo;

    // prisma.tbl_mini_Jogo.create({

    //     data:{
    //         nome: data.nome,
    //         descricao: data.descricao,
    //         icone: data.icone,
    //         imagem_fundo: data.imagem_fundo,
    //         tbl_passo: {
    //             create: [
    //                 {dialogo: 'Qual é a correta?', imagem:'imagem_aqui.jpeg' , ordem: 1, acao: 'Abrir a torneira'},
    //                 {dialogo: 'Qual é a correta?', imagem:'imagem_aqui.jpeg' , ordem: 1, acao: 'Abrir a torneira'},
    //                 {dialogo: 'Qual é a correta?', imagem:'imagem_aqui.jpeg' , ordem: 1, acao: 'Abrir a torneira'},
    //                 {dialogo: 'Qual é a correta?', imagem:'imagem_aqui.jpeg' , ordem: 1, acao: 'Abrir a torneira'}
    //             ]
    //         }
    //     },
    //     select:{

    //         id: true

    //     }
    
    // }).then(

    //     (data) =>{

    //         res.status(200).json(data);
    //     }
    
    // ).catch(

    //     (error) =>{

    //         console.log(error)

    //         if(error.code == "P2000"){

    //             res.status(500).json({message: `A quantidade máxima de caracteres foi ultrapassada no campo ${error.meta.column_name}.`})

    //         }else{

    //             const argument = error.message.split('Argument')[1]

    //             if(argument){

    //                 const err = argument.split('\n')[0]

    //                 res.status(400).json({"message" : err});

    //             }else{

    //                 res.status(500).json({"message" : error});

    //             }   
    //         }
    //     }
    // );
}

exports.get = async (req, res, next) =>{

    prisma.tbl_mini_Jogo.findMany({

        include:{
            tbl_passo: true
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