const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const jokesRouter = require('../jokes/jokesRouter.js');
const authRouter = require('../auth/authRouter.js');
const authenticator = require('../auth/authenticator.js');

const Jokes = require('../jokes/jokeModel.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/jokes', authenticator, jokesRouter);
server.use('/api/auth', authRouter);

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
        console.log(error);
        res.status(500).json({
            message: 'error in post jokes'
        });
    });
});

module.exports = server;