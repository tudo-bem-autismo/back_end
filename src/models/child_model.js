'use strict';

const prisma = require('../prismaClient');

const createChildren = async (data) => {

    const queryResult = await prisma.tbl_crianca.create({

        data:{
            nome: data.nome,
            foto: data.foto,
            data_nascimento: new Date( data.data_nascimento)  ,
            id_genero: data.id_genero,
            id_nivel_autismo: data.id_nivel_autismo,
            id_responsavel: data.id_responsavel
        },
        select:{
            id: true
        }
    });

    return await queryResult;
}

const getAllChildren = async () => {
    const allChildren = await prisma.tbl_crianca.findMany();

    if(allChildren){
        return await allChildren;
    }else{
        return false;
    }
}

const getChildrenById = async (id) => {
    const result = await prisma.tbl_crianca.findUnique({
        where:{
            id:id
        }
    });

    if(result){
        return await result;
    }else{
        return false;
    }
}

const updateChildren = async (id, data) => {
    const queryResult = await prisma.tbl_crianca.update({
        where:{
            id: id
        },
        data:{
            nome: data.nome,
            foto: data.foto,
            data_nascimento: new Date(data.data_nascimento),
            id_genero: data.id_genero,
            id_nivel_autismo: data.id_nivel_autismo,
            id_responsavel: data.id_responsavel
        }
    });

    if(queryResult.nome == data.nome && queryResult.foto == data.foto &&
        queryResult.data_nascimento.getTime() == new Date(data.data_nascimento).getTime() &&
       queryResult.id_genero == data.id_genero &&
       queryResult.id_nivel_autismo == data.id_nivel_autismo &&
       queryResult.id_responsavel == data.id_responsavel){

        return queryResult;
        
    }else{
        return false;
    }
}

const deleteChildren = async (id) => {

    const queryResult = await prisma.tbl_crianca.delete({
        where:{
            id:id
        }
    });

    if(queryResult.id != null){
        return true;
    }else{
        return false;
    }
}

module.exports = { createChildren, getAllChildren, getChildrenById, updateChildren, deleteChildren }
