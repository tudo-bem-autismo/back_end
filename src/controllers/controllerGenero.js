'use strict';

exports.post = (req, res, next) =>{

    res.status(201).send(req.body);
};

exports.put = (req, res, next) =>{

    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};

exports.delete = (req, res, next) =>{

    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};

exports.get = async (req, res, next) =>{

    const model = require('../model/modelGenero')

    const data = await model.getAllGeneros();

    res.status(200).send(data)

    
};