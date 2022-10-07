'use strict';

const prisma = require('../prismaClient');

exports.post = (req, res, next) => {

    const data = req.body;

    console.log(data.situacoes[0].passos[0])


}