const mongo = require('../mongodb');

// const getCollection = mongo.then(db => db.collection('pirates'));

module.exports = {
    find() {
        return mongo.then(db => {
            return db.collection('mini-horse')
                .find()
                .toArray();
        });
    },

    findAll() {
        //find all
    },

    insert(miniHorse) {
        return mongo.then(db => {
            return db.collection('mini-horse')
                .insert(miniHorse)
                .then(result => result.ops[0]);
        });
    },

    update() {

    },

    delete() {

    },

};