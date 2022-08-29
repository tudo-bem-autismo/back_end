'use strict';

exports.post = async (req, res, next) =>{

    if(req.body != null){

        const data = req.body;

        if(data.nome != null && data.email != null && data.senha != null){

            if(data.nome.length <= 100 && data.email.length <= 200 &&
                data.senha.length <= 8){
                
                const model = require('../model/modelResponsavel');

                const result = await model.createResponsavel(data);
        
                if(result.id != null){
        
                    res.status(201).send(result);
                }
            
            }else{
                
                res.status(400).send({
                    message: "A quantidade máxima de caracteres foi ultrapassada."
                })
            }

        }else{
            res.status(400).send({
                message: "Dados inválidos"
            });
        }
    }
};

exports.get = async (req, res, next) =>{

    const model = require('../model/modelResponsavel')

    const data = await model.getAllResponsaveis();

    if(data != null){

        res.status(200).send(data);
    
    }else{

        res.status(500);
    }  
};

exports.getById = async (req, res, next) =>{

    const id = req.params.id;

    if(id != null && !isNaN(id)){
       
        const model = require('../model/modelResponsavel')

        const data = await model.getResponsavelByid(parseInt(id));

        if(data != null){

            res.status(200).send(data);
        
        }else{

            res.status(500);
        }
    
    }else{

        res.status(400).send({
            message: "ID inválido"
        });
    }      
};

exports.put = async (req, res, next) =>{

    if(req.body != null){

        const id = req.params.id;
        const data = req.body;

        if( id != null && !isNaN(id) && 
            data.nome != null && data.email != null && 
            data.senha != null){

            if(data.nome.length <= 100 && data.email.length <= 200 &&
            data.senha.length <= 8){
            
                const model = require('../model/modelResponsavel');

                const responsavel = await model.getResponsavelByid(parseInt(id));

                if(responsavel){

                    const result = await model.putResponsavel(parseInt(id), data);

                    if(result){

                        res.status(200).send({
                            message: "Registro atualizado com sucesso!"
                        });

                    }else{
                        res.status(500).send({
                            message: "Não foi possível atualizar o registro."
                        })
                    }

                }else{
                    res.status(400).send({
                        message: "ID não encontrado na base de dados."
                    });
                }
            
                
            }else{
                
                res.status(400).send({
                    message: "A quantidade máxima de caracteres foi ultrapassada."
                });
            }

        }else{
            res.status(400).send({
                message: "Dados inválidos"
            });
        }
    }
};

exports.delete = async (req, res, next) =>{

    const id = req.params.id;

    if(id != null && !isNaN(id)){

        const model = require('../model/modelResponsavel');

        const responsavel = await model.getResponsavelByid(parseInt(id));
        
        if(responsavel){

            const result = await model.deleteResponsavel(parseInt(id));

            if(result){

                res.status(200).send({
                    message: "Registro excluído com sucesso."
                })
            
            }else{

                res.status(500).send({
                    message: "Não foi possível excluir o registro."
                })
            }
        
        }else{

            res.status(400).send({
                message: "ID não encontrado na base de dados."
            });
        }
    }else{
        
        res.status(400).send({
            message: "ID inválido!"
        });
    }
}