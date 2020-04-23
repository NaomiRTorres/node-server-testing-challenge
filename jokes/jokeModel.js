const db = require('../data/dbConfig.js');

module.exports = {
    insert, 
    update,
    remove,
    getAll,
    findBy,
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

function findBy(filter){
    return db('jokes').where(filter);
}

function findById(id){
    return db('jokes')
    .where({ id })
    .first();
}