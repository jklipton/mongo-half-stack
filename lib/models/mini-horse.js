const mongo = require('../mongodb');

module.exports = {
    findOne(id) {
        return mongo.then(db => {
            return db.collection('mini-horses')
                .find({ _id : ObjectId(`${id}`) })
                .toArray();
        });
    },

    findAll() {
        return mongo.then(db => {
            return db.collection('mini-horses')
                .find()
                .toArray();}
        });
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