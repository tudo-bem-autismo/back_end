const prisma = require('../prismaClient');

const getAllNiveis = async ()=>{

    const allNiveis = await prisma.tbl_nivel_autismo.findMany()

    return await allNiveis
}

module.exports = {getAllNiveis}