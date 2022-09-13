'use strict';

exports.post = async (req, res, next) =>{

    try{

        if(req.body != null){

            let data = req.body;
    
            if(data.nome != null && data.email != null && data.senha != null){
    
                if(data.nome.length <= 100 && data.email.length <= 200 &&
                    data.senha.length <= 8){
    
                    const model = require('../models/modelResponsavel');
    
                    const emailExists = await model.getResponsavelByEmail(data.email);
    
                    if(!emailExists){
    
                        const crypto = require('../config/globalFunctions');
                        const encryptedSenha = crypto.encrypt(data.senha);
    
                        if(encryptedSenha){
    
                            data.senha = encryptedSenha;
    
                            const result = await model.createResponsavel(data);
                    
                            if(result.id != null){
                    
                                res.status(201).send(result);
                            
                            }else{
                                res.status(500).send({
                                    message: "Não foi pssível inserir o registro."
                                })
                            }
                        
                        }else{
                            res.status(500).send({
                                message: "Não foi possível encriptar a senha."
                            })
                        }
    
                    }else{
    
                        res.status(400).send({
                            message: "Email já cadastrado na base de dados."
                        });
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

    }catch(error){

        res.status(500).send(error);
    }

    
};

exports.get = async (req, res, next) =>{

    try{

        const model = require('../models/modelResponsavel')

        const data = await model.getAllResponsaveis();

        if(data != null){

            res.status(200).send(data);
        
        }else{

            res.status(500);
        }
    
    }catch(error){
        res.status(500).send(error)
    }

      
};

exports.getById = async (req, res, next) =>{

    try{

        const id = req.params.id;

        if(id != null && !isNaN(id)){
        
            const model = require('../models/modelResponsavel')

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

    }catch(error){

        res.status(500).send(error);
    }

          
};

exports.put = async (req, res, next) =>{

    try{

        if(req.body != null){

            const id = req.params.id;
            const data = req.body;
    
            if( id != null && !isNaN(id) && 
                data.nome != null && data.email != null && 
                data.senha != null){
    
                if(data.nome.length <= 100 && data.email.length <= 200 &&
                data.senha.length <= 8){
                
                    const model = require('../models/modelResponsavel');
    
                    const emailExists = await model.getResponsavelByEmail(data.email);
    
                    console.log(emailExists)
    
                    if(!emailExists || emailExists.id == id){
    
                        console.log('entrei')
    
                        const responsavel = await model.getResponsavelByid(parseInt(id));
    
                        if(responsavel){
    
                            const crypto = require('../config/globalFunctions');
                            const encryptedSenha = crypto.encrypt(data.senha);
    
                            if(encryptedSenha){
    
                                data.senha = encryptedSenha;
    
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
    
                                res.status(500).send({
                                    message: "Não foi possível encriptar a senha."
                                });
    
                            }    
    
                        }else{
                            res.status(400).send({
                                message: "ID não encontrado na base de dados."
                            });
                        }
    
                    }else{
    
                        res.status(400).send({
                            message: "Email já cadastrado na base de dados."
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
    
    }catch(error){

        res.status(500).send(error);
    }

    
};

exports.delete = async (req, res, next) =>{

    try{

        const id = req.params.id;

        if(id != null && !isNaN(id)){

            const model = require('../models/modelResponsavel');

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

    }catch(error){

        res.send(error).status(500);
    }

    
}

exports.login = async (req, res, next) =>{

    try{

        if(req.body != null){
        
            const data = req.body;
    
            if(data.email != null && data.senha != null){
    
                const model = require('../models/modelResponsavel');
    
                const responsavel = await model.getResponsavelByEmail(data.email)
    
                if(responsavel){
    
                    const crypto = require('../config/globalFunctions');
                    const encryptedSenha = crypto.encrypt(data.senha);
    
                    if(encryptedSenha){
    
                        // console.log(encryptedSenha);
                        // console.log(responsavel.senha);
    
                        if(encryptedSenha == responsavel.senha){
    
                            res.status(202).send({
                                Login: true,
                                id: responsavel.id
                            });
                        
                        }else{
    
                            res.status(406).send({
                                message: "Senha incorreta."
                            })
                        }
                    }
                
                }else{
    
                    res.status(400).send({
                        message: "Email não encontrado na base de dados."
                    });
                }
            
            }else{
                res.status(400).send({
                    message: "Dados inválidos"
                });
            }
        }
    
    }catch(error){

        res.status(500).send(error)
    }

    


}