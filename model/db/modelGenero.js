const dataBase = require('./connection');

const selectAllGeneros = async () =>{

    const connection = await dataBase.connect();

    const [result] = await connection.query('selec * from tbl_genero;');

    console.log(await result);

    return await result;
    
};

const insertGenero = async (genero) =>{

    const connection = await dataBase.connect();
    const script = 'insert into tbl_genero (genero, sigla) values (?,?)';
    const values = [genero.genero, genero.sigla ];

    await connection.query(script, values);
    
}

const updateGenero = async (genero) =>{

    const connection = await dataBase.connect();
    const script = 'update tbl_genero set genero = ?, sigla = ? where id = ? ;';
    const values = [genero.genero, genero.sigla, genero.id];

    await connection.query(script, values);
}

const deleteGenero = async (id) =>{

    const connection = await dataBase.connect();
    const script = 'delete from tbl_genero where id = ? ;';
    const values = [id];

    await connection.query(script, values);
}

module.exports = selectAllGeneros;