const express = require('express');

const Jokes = require('../jokes/jokeModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.get('/jokes', (req, res) => {
    Jokes.getAll()
    .then(jokes => {
        res.status(200).json(jokes);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    });
});

server.post('/jokes', (req, res) => {
    const jokeInfo = req.body;
    Jokes.insert(jokeInfo)
    .then(ids => {
        res.status(201).json({
            message: 'Joke created successfully'
        });
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: error.message
        });
    });
});

module.exports = server;