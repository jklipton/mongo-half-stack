const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    findOne(id) {
        
        return mongo.then(db => {
            return db.collection('mini-horses')
                .find( ObjectId(id) )
                .toArray();
        });
    },

    findAll() {
        return mongo.then(db => {
            return db.collection('mini-horses')
                .find()
                .toArray();
        });
    },

    insert(miniHorse) {
        return mongo.then(db => {
            return db.collection('mini-horses')
                .insert(miniHorse)
                .then(result => result.ops[0]);
        });
    },

    update(miniHorse) {
        const obj = { _id : ObjectId(miniHorse._id) };
        delete miniHorse._id;
        return mongo.then(db => {
            return db.collection('mini-horses')
                .update(obj, miniHorse);
        });
    },

    delete(id) {
        const obj = { _id : ObjectId(id) };
        return mongo.then(db => {
            return db.collection('mini-horses')
                .remove( obj );
        });
    },

};