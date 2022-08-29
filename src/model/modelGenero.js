const prisma = require('../prismaClient')

const getAllGeneros = async ()=>{

    const allGeneros = await prisma.tbl_genero.findMany()

    console.log
    return await allGeneros
}

module.exports = {getAllGeneros}