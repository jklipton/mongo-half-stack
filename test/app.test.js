require('dotenv').config({ path: './test/.env' });
const mongo = require('../lib/mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);
const { assert } = chai;


describe('MiniHorses API', () => {

    before(() => {
        return mongo.then(db => {
            db.collection('mini-horses').remove();
        });
    });

    let miniHorse = {
        name: 'Midnite',
        color: 'black',
        description: 'three legged'
    };

    it('saves a mini horse', () => {
        return chai.request(app)
            .post('/mini-horses')
            .send(miniHorse)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, miniHorse.name);
                miniHorse = body;
            });
    });

});