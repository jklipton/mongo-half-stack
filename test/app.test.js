const mongo = require('../lib/mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);
const { assert } = chai;


describe('MiniHorses API', () => {

    before(() => {
        return mongo.then(db => {
            return db.dropCollection('mini-horses')
                .catch( err => {
                    if (err.codeName !== 'NamespaceNotFound') {
                        throw err;
                    }
                });
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
        return chai.request(app)
            .get('/miniHorses')
            .then(({ body }) => {
                console.log( body );
            });
    });

    it('saves a mini horse', () => {
        return chai.request(app)
            .post('/miniHorses')
            .send(midnite)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, midnite.name);
                midnite = body;
            });
    });

    // it('gets all minihorses', () => {
    //     return chai.request(app)
    //         .post('/miniHorses')
    //         .send(sebastian)
    //         .then( ({ body }) => {
    //             sebastian = body;
    //             return chai.request(app)
    //                 .get('/miniHorses');
    //         })
    //         .then( ({ body }) => {
    //             assert.deepEqual(body, [midnite, sebastian]);
    //         });
    // });

    it('find specific minihorse', () => {
        return chai.request(app)
            .get(`/miniHorses/${midnite._id}`)
            .then( ({ body }) => {
                assert.equal(body.name, midnite.name);
            });
    });

    // it('deletes a minihorse', () => {
    //     return chai.request(app)
    //         .del(`/miniHorses/${sebastian._id}`)
    //         .then(() => {
    //             return chai.request(app)
    //                 .get('/miniHorses');
    //         })
    //         .then(({ body }) => {
    //             assert.deepEqual(body, [midnite]);
    //         });
    // });


    after(() => mongo.client.close());

});