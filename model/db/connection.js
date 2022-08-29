const connect = async() =>{

    if(global.conectionMysql && global.conectionMysql.state != 'disconected'){

        return global.conectionMysql;
    }

    const mysql = require('mysql2/promise');
    const conection = mysql.createConnection("mysql://root:272421@localhost:3306/db_tudo_bem_autismo");

    console.log('I am conected.');

    global.conectionMysql = conection;
    return conection;
}

// console.log(connect());

module.exports = {connect};