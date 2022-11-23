'use strict';

const prisma = require('../prismaClient');
const firebase = require('../../services/firebase')

exports.post = async (req, res, next) => {

    console.log(req.body)
    // try {
    //     const data = req.body;
    //     const files = req.files

    //     const uploads = files.map((file) => {
    //         return firebase.uploadImages(file)
    //     })  

    //     prisma.tbl_icone.createMany({
    //         data: 
    //     }).then(
    //         (icone) => {
    //             res.status(201).json(icone);
    //         }
    //     ).catch(
    //         (error) => {
    //             console.log(error);
    //             res.status(500).json({ "message": error })
    //         }
    //     )
    // } catch (error) {
    //     const e = new Error(error)
    //     console.log(e)
    //     res.status(500).json(error)
    // }
}

// exports.post = (req, res, next) => {

//     const data = req.body;

//     const {firebaseUrl} = req.file ? req.file : "";

//     prisma.tbl_icone.create({
//         data:{
//             icone: firebaseUrl,
//             titulo: data.titulo
//         },
//         select:{
//             id: true
//         }
//     }).then(
//         (icone) => {
//             res.status(201).json(icone);
//         }
//     ).catch(
//         (error) => {
//             console.log(error);
//             res.status(500).json({ "message": error })
//         }
//     )
// }

exports.get = (req, res) =>{

    prisma.tbl_icone.findMany()
    .then(
        (data) => {
            res.status(200).json(data);
        }
    )
    .catch(
        (error) => {
            res.status(500).json({ "message": error })
        }
    )
}