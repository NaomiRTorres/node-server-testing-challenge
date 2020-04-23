const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js');
const Jokes = require('../jokes/jokeModel.js');

router.post('/register', (req, res) => {
    let joke = req.body;

    const rounds = process.env.HASH_ROUNDS || 8;

    const hash = bcrypt.hashSync(joke.password, rounds);

    joke.password = hash;

    Jokes.insert(joke)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMessage: error.message
        });
    });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Jokes.findBy({ username })
    .then(([joke]) => {
        if(joke && bcrypt.compareSync(password, joke.password)) {
            const token = generateToken(joke);
            res.status(200).json({
                message: 'Welcome', token
            });
        } else {
            res.status(401).json({
                message: 'You cannot pass'
            });
        };
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMessage: error.message
        });
    });
});

function generateToken(joke){
    const payload = {
        jokeId: joke.id,
        username: joke.username,
        password: joke.password
    };
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: '3d'
    };
    return jwt.sign(payload, secret, options);
}

module.exports = router;