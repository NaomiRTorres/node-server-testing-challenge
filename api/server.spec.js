const request = require('supertest');

const server = require('./server.js');
const db = require('../data/dbConfig.js');

describe('server', function(){
    describe('/', function(){
        it('should return 200 OK', function(){
            return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200);
            });
        });
    });

    describe('GET /jokes', function(){
        it('should return a 200 with jokes', function(){
            return request(server)
            .get('/jokes')
            .then(res => {
                expect(res.status).toBe(200);
            });
        });
    });

    describe('POST /jokes', function(){
        beforeEach(async () => {
            await db('jokes').truncate();
        });

        it('should return a 201 on success', function(){
            return request(server)
            .post('/jokes')
            .send({ name: 'DadJoke4' })
            .then(res => {
                expect(res.status).toBe(201);
            });
        });

        it('should return a message saying `joke created successfully`', function(){
            return request(server)
            .post('/jokes')
            .send({ name: 'DadJoke4' })
            .then(res => {
                expect(res.body.message).toBe('Joke created successfully');
            });
        });

        it('should add the joke to the db', function(){
            const jokeName = 'DadJoke4';

            const existing = await db('jokes').where({ name: jokeName});
            expect(existing).toHaveLength(0);

            await request(server)
            .post('/jokes')
            .send({ name: jokeName })
            .then(res => {
                expect(res.body.message).toBe('Joke created successfully');
            });

            await request(server)
            .post('/jokes')
            .send({ name: 'DadJoke5' })
            .then(res => {
                expect(res.body.message).toBe('Joke created successfully');
            });

            const inserted = await db('jokes')
            expect(inserted).toHaveLength(2);
        });
    });
});