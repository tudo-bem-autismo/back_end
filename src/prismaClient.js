const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// async function main() {
  
//   await prisma.tbl_genero.create({
//     data:{
//       genero: "Male",
//       sigla: "MA"
//     }
//   })

//   const allGeneros = await prisma.tbl_genero.findMany();
//   console.log(allGeneros)
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

module.exports = prisma;
  