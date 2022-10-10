'use strict';

const prisma = require('../prismaClient');

exports.post = (req, res, next) => {

    const data = req.body;

    const situacoes = data.situacoes.map((situacao) =>{

        const currentSituacao = situacao

        const passoCorreto = situacao.passos[0].passo_correto == 1 ? situacao.passos[0] : situacao.passos[1] 
        const passoErrado = situacao.passos[0].passo_correto == 0 ? situacao.passos[0] : situacao.passos[1] 

        prisma.tbl_situacao_escolha.create({
            data:{
                
                ordem: situacao.ordem,
                dialogo: situacao.dialogo,
                imagem_exemplo: situacao.imagem_exemplo,
                cor_fundo: situacao.cor_fundo,
                imagem_fundo: situacao.imagem_fundo,
                id_mini_jogo: parseInt(situacao.id_mini_jogo),
                tbl_passo:{
                    create: [
                        passoCorreto,
                        passoErrado
                    ]
                }    
            }
        }).then(
            
            () => {
                res.status(200).json({message: 'Deu certo'})
            }
        ).catch(

            (err) =>{

                console.log(err)
                
            }
        )
    })
}