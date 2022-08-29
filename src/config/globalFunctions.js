'use strict';

const crypto = require('crypto');

const algorithm = "sha256";
const password = "123456abcdefghijklmnopqrstuvwxyz";

const encrypt = (data) => {

    const hash = crypto.createHmac(algorithm, password);

    const update = hash.update(data);
    const digest = update.digest('hex');

    if(digest){

        return digest;
    }else{

        return false;
    }
}

module.exports = {encrypt};
