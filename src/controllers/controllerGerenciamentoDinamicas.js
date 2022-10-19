'use strict'

const prisma = require('../prismaClient');

exports.get = (req, res) => {

    prisma.tbl_restricao.findMany({

        include: {

            tbl_crianca: true,
            tbl_mini_jogo: true
        }
    }).then()
}