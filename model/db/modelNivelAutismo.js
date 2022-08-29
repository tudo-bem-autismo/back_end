const dataBase = require('./connection');

const selectAllNiveisAutismo = async () =>{

    const connection = await dataBase.connect();
    const [result] = await connection.query('select * from tbl_nivel_autismo;');

    console.log(await result);

    return await result;
    
};

const insertNivelAutismo = async (nivelAutismo) =>{

    const connection = await dataBase.connect();
    const script = 'insert into tbl_nivel_autismo (nivel, descricao) values (?,?)';
    const values = [nivelAutismo.nivel, nivelAutismo.descricao ];

    await connection.query(script, values);
    
}

const updateNivelAutismo = async (nivelAutismo) =>{

    const connection = await dataBase.connect();
    const script = 'update tbl_nivel_autismo set nivel = ?, descricao = ? where id = ? ;';
    const values = [nivelAutismo.nivel, nivelAutismo.descricao, nivelAutismo.id];

    await connection.query(script, values);
}

const deleteGenero = async (id) =>{

    const connection = await dataBase.connect();
    const script = 'delete from tbl_nivel_autismo where id = ? ;';
    const values = [id];

    await connection.query(script, values);
}

console.log(selectAllGeneros());