const notFound = require('./not-found');
const miniHorse = require('../models/mini-horse');

const get = (req, res) => {
    const name = req.paths[1];
    name ? getOne(name, req, res) : getAll(req, res);
};

const getOne = (name, req, res) => {
    miniHorse.find(id)
        .then(doggo => {
            res.send(doggo);
        });
};

const getAll = (req, res) => {
    miniHorse.findAll().then(miniHorses => {
        res.send(miniHorses);
    });
};

const post = (req, res) => {
    miniHorse.insert(req.body).then(miniHorse => {
        res.send(miniHorse);
    });
};

// const put = (req, res) => {
//     doggo.updateBorker(req.body).then(updated => {
//         res.send(updated);
//     });
// };

// const del = (req, res) => {
//     doggo.deleteBorker(req.paths[1])
//         .then(() => res.send({ removed: true }));
// };

// const methods = { get, post, put, delete: del };

const methods = { get, post };


module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};