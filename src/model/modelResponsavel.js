'use strict';

const prisma = require('../prismaClient');

const bodyParser = require('body-parser');

const getAllResponsaveis = async ()=>{

    const allResponsaveis = await prisma.tbl_responsavel.findMany();

    if(allResponsaveis){
        
        return await allResponsaveis;
    
    }else{

        return false;
    }
    
}

const getResponsavelByid = async (id)=>{

    const result = await prisma.tbl_responsavel.findUnique({
        where:{
            id: id
        }
    });

    if(result){

        return await result;
    
    }else{
        return false;
    }
}

const getResponsavelByEmail = async (email) =>{

    const result = await prisma.tbl_responsavel.findUnique({

        where:{
            email: email,
        },
    });

    //console.log(result.senha)

    if(result){

        if(result.id != null){

            // console.log('entrei model')
    
            return await result;
        
        }else{
    
            return false;
        }
    
    }else{

        return false;
    }
    

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

    console.log(queryResult);

    if(queryResult.nome == data.nome &&
        queryResult.telefone == data.telefone &&
        queryResult.email == data.email &&
        queryResult.senha == data.senha){

        console.log(queryResult)

        return true;

    }else{

        return false;
    }
}

const deleteResponsavel = async (id) =>{

    const queryResult = await prisma.tbl_responsavel.delete({
       
        where:{
            id: id
        }
    });

   if(queryResult.id != null){

        return true;
   
    }else{

        return false;
    }
}



module.exports = {getAllResponsaveis,
                createResponsavel,
                getResponsavelByEmail,
                getResponsavelByid,
                putResponsavel,
                deleteResponsavel}