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
        select: {

            id: true

        }

    }).then(

        (data) => {

            res.status(200).json(data);
        }

    ).catch(

        (error) => {

            console.log(error)

            if (error.code == "P2000") {

                res.status(500).json({ message: `A quantidade máxima de caracteres foi ultrapassada no campo ${error.meta.column_name}.` })

            } else {

                const argument = error.message.split('Argument')[1]

                if (argument) {

                    const err = argument.split('\n')[0]

                    res.status(400).json({ "message": err });

                } else {

                    res.status(500).json({ "message": error });

                }
            }
        }
    );
}

exports.get = async (req, res, next) => {

    const id = parseInt(req.params.id)


    // prisma.$queryRawUnsafe`
    // select tbl_mini_jogo.id as id_mini_jogo,
	// 	tbl_mini_jogo.nome as nome_mini_jogo,
    //     tbl_mini_jogo.icone,
    //     tbl_restricao.id as id_restricao,
    //     tbl_crianca.id as id_crianca,
    //     tbl_crianca.nome as nome_crianca,
    //     tbl_crianca.foto,
    //     tbl_responsavel.id as id_responsavel
	// from tbl_mini_jogo
	// 	inner join tbl_restricao
	// 		on tbl_mini_jogo.id = tbl_restricao.id_mini_jogo
	// 	inner join tbl_crianca
	// 		on tbl_restricao.id_crianca = tbl_crianca.id
	// 	inner join tbl_responsavel
	// 		on tbl_crianca.id_responsavel = tbl_responsavel.id
	// 	where tbl_responsavel.id = ${parseInt(id)}
	// 	order by tbl_responsavel.id;`

    // prisma.tbl_responsavel.findMany({

    //     include:{
    //         tbl_crianca: true
    //     },
    //     select:{
    //         tbl_crianca:{
    //             include:{
    //                 tbl_restricao:{
    //                     where:{
    //                         t
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // })
    // prisma.tbl_mini_jogo.findMany({
    //     include:{
    //         tbl_restricao:{
    //             include:{
    //                 tbl_crianca:{
    //                     include:{
    //                         tbl_responsavel: true
    //                     }
    //                 }
    //             }
    //         }
    //     },
    //     where:{
            
    //     }
    // })

    // prisma.tbl_mini_jogo.findMany({
    //     select:{
    //         tbl_restricao:{
    //             include:{
    //                 tbl_crianca:{
    //                     include:{
    //                         tbl_responsavel: true
    //                     }
    //                 }
    //             }
    //         }
    //     },
    //     where:{
    //         tbl_restricao:{
    //             i
    //         }
    //     }
    // })
        .then(

            (data) => {

                res.status(200).json(data);
            }
        )
        .catch(

            (error) => {

                console.log(error)

                res.status(500).json({ "message": error })
            }
        );
}

exports.getById = async (req, res, next) => {

    const id = req.params.id

    prisma.tbl_mini_jogo.findMany({

        where: {

            id: parseInt(id)

        },
        include: {
            tbl_situacao_escolha: {
                include: {
                    tbl_passo: true
                },
                orderBy: {
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

                        situation.tbl_passo.sort(

                            () => {

                                const random = Math.floor(Math.random() * (255 - 0) + 0)

                                if (random >= 127) {

                                    return 1

                                } else {

                                    return -1
                                }
                            }
                        )

                        return situation
                    }
                )

                data[0].tbl_situacao_escolha = datWithRandomOrderOfSteps

                res.status(200).json(data);
            }
        )
        .catch(

            (error) => {

                console.log(error)

                if (error.code == "P2000") {

                    res.status(500).json({ message: `A quantidade máxima de caracteres foi ultrapassada no campo ${error.meta.column_name}.` })

                } else {

                    const argument = error.message.split('Argument')[1]

                    if (argument) {

                        const err = argument.split('\n')[0]

                        res.status(400).json({ "message": err });

                    } else {

                        res.status(500).json({ "message": error });

                    }
                }
            }
        );
}