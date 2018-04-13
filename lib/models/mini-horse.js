const mongo = require('../mongodb');

module.exports = {
    find() {
        return mongo.then(db => {
            return db.collection('mini-horses')
                .find()
                .toArray();
        });
    },

    findAll() {
        //find all
    },

    insert(miniHorse) {
        return mongo.then(db => {
            return db.collection('mini-horses')
                .insert(miniHorse)
                .then(result => result.ops[0]);
        });
    },

    update() {

    },

    delete() {

    },

};