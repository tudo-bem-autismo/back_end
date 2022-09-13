'use strict';

const multer = require('multer');
const multerConfig = require('../config/multer');

exports.post = (multer(multerConfig).single("file")), (req, res, next) => {
    
    if(req.body != null){

        let data = req.body;

        if(data.nome != null && data.data_nascimento != null && data.id_genero != null && data.id_nivel_autismo != null && data.id_responsavel != null){

            if(data.nome.length <= 100){

                const model = require('../models/child_model');

                const result = model.createChildren(data);
                    
                if(result.id != null){
                    
                    res.status(201).send(result);
                            
                }else{
                    res.status(500).send({
                        message: "Não foi pssível inserir o registro no banco de dados."
                    })
                }
            }else{
                res.status(400).send({
                    message: "A quantidade máxima de caracteres foi ultrapassada."
                });
            }
        }else{
            res.status(400).send({
                message: "Preencha todos os campos!"
            });
        }
    }
}

exports.get = async (req, res, next) => {

    const model = require('../models/child_model');
    const data = await model.getAllChildren();
    
    if(data != null){
        res.status(200).send(data);
    }else{
        res.status(500);
    }
}

exports.getById = async (req, res, next) => {

    const id = req.params.id;

    if(id != null && !isNaN(id)){

        const model = require('../models/child_model')
        const data = await model.getChildrenById(parseInt(id));

        if(data != null){
            res.status(200).send(data);
        }else{
            res.status(500);
        }
    }else{
        res.status(400).send({
            message: "ID inválido!"
        });
    }
}

exports.put = async (req, res, next) => {
    if(req.body != null){

        const id = req.params.id;
        const data = req.body;

        if(id != null && !isNaN(id) && data.nome != null && 
           data.data_nascimento != null && 
           data.id_genero != null && data.id_nivel_autismo != null &&
           data.id_responsavel != null){

            if(data.nome.length <= 100){

                const model = require('../models/child_model');
                const child = model.getChildrenById(parseInt(id));
                const result = await model.updateChildren(parseInt(id), data);

                if(child){

                    if(result.id != null){

                        res.status(200).send({
                            message: "Registro atualizado com sucesso!"
                        });

                    }else{
                        res.status(500).send({
                            message: "Não foi possível atualizar o registro."
                        });
                    }
                }else{
                    res.status(400).send({
                        message: "ID não encontrado no banco de dados."
                    });
                }
            }else{
                es.status(400).send({
                    message: "A quantidade máxima de caracteres foi ultrapassada."
                });
            }
        }else{
            res.status(400).send({
                message: "Dados inválidos."
            });
        }
    }
}

exports.delete = async (req, res, next) => {
    
    const id = req.params.id;

    if(id != null && !isNaN(id)){

        const model = require('../models/child_model');
        const child = await model.getChildrenById(parseInt(id));

        if(child){

            const result = await model.deleteChildren(parseInt(id));

            if(result){
                res.status(200).send({
                    message: "Registro excluído com sucesso!"
                });
            }else{
                res.status(500).send({
                   message: "Não foi possível excluir o registro do banco de dados." 
                });
            }
        }else{
            res.status(400).send({
                message: "ID não encontrado no banco de dados."
            });
        }
    }else{
        res.status(400).send({
            message: "ID inválido!"
        });
    }
}