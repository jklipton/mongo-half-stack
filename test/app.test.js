const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const MiniHorse = require('../lib/models/mini-horse');

chai.use(chaiHttp);
const { assert } = chai;

describe('MiniHorses API', () => {

    before((done) => {
        MiniHorse.remove({}, () => {
            done();
        });
    });

    let midnite = {
        name: 'Midnite',
        color: 'black',
        description: 'three legged'
    };

    let sebastian = {
        name: `Li'l Sebastian`,
        color: 'flaxen chestnut',
        description: 'animal, legend, friend'
    };

    it('start with no horses', () => {
        return chai.request(server)
            .get('/mini-horses')
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });

    it('saves a mini horse', () => {
        return chai.request(server)
            .post('/mini-horses')
            .send(midnite)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, midnite.name);
                midnite = body;
            });
    });

    it('gets all minihorses', () => {
        return chai.request(server)
            .post('/mini-horses')
            .send(sebastian)
            .then( ({ body }) => {
                sebastian = body;
                return chai.request(server)
                    .get('/mini-horses');
            })
            .then( ({ body }) => {
                assert.deepEqual(body, [midnite, sebastian]);
            });
    });

    it('find specific minihorse', () => {
        return chai.request(server)
            .get(`/mini-horses/${sebastian._id}`)
            .then( ({ body }) => {
                assert.deepEqual(body, sebastian);
            });
    });

    it('updates minihorse', () => {
        sebastian.description = 'gone too soon';

        return chai.request(server)
            .put(`/mini-horses/${sebastian._id}`)
            .send(sebastian)
            .then(() => {
                return chai.request(server)
                    .get(`/mini-horses/${sebastian._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, sebastian);
            });
    });

    it('deletes a minihorse', () => {
        return chai.request(server)
            .del(`/mini-horses/${sebastian._id}`)
            .then(() => {
                return chai.request(server)
                    .get('/mini-horses');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [midnite]);
            });
    });

    after(() => server.close());

});