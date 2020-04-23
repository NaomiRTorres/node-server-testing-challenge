const router = require('express').Router();

const Jokes = require('./jokeModel.js');

router.get('/', (req, res) => {
    console.log('token', req.decodedToken);
    Jokes.find()
    .then(jokes => {
        res.json(jokes);
    })
    .catch(error => {
        console.log(error);
        res.send(error);
    });
});

module.exports = router;