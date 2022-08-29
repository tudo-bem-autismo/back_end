'use strict';

const { query } = require('express');
const prisma = require('../prismaClient');

const getAllResponsaveis = async ()=>{

    const allResponsaveis = await prisma.tbl_responsavel.findMany()

    return await allResponsaveis
}

const getResponsavelByid = async (id)=>{

    const result = await prisma.tbl_responsavel.findUnique({
        where:{
            id: id
        }
    });

    return await result
}

const createResponsavel = async (data) =>{

    const queryResult = await prisma.tbl_responsavel.create({

        data:{
            nome: data.nome,
            email: data.email,
            senha: data.senha,
            telefone: data.telefone
        },
        select:{
            id: true
        }
    });

    return queryResult;
}

const putResponsavel = async (id, data) =>{

    const queryResult = await prisma.tbl_responsavel.update({
        where:{
            id: id
        },
        data:{
            nome: data.nome,
            email: data.email,
            senha: data.senha,
            telefone: data.telefone
        }
    });

    return queryResult;
}

module.exports = {getAllResponsaveis,
                createResponsavel,
                getResponsavelByid,
                putResponsavel}