const db = require('../data/dbConfig.js');

module.exports = {
    insert, 
    update,
    remove,
    getAll,
    findById,
};

async function insert(joke){
    return db('jokes').insert(joke, 'id');
}

async function update(id, changes){
    return null;
}

function remove(id){
    return null;
}

function getAll(){
    return db('jokes');
}

function findById(id){
    return null;
}