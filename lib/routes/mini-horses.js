const notFound = require('./not-found');
const miniHorse = require('../models/mini-horse');

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getOne = (id, req, res) => {
    miniHorse.findOne(id)
        .then(miniHorse => {
            res.send(miniHorse);
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

const put = (req, res) => {
    miniHorse.update(req.body).then(updated => {
        res.send(updated);
    });
};

const del = (req, res) => {
    miniHorse.delete(req.paths[1]).then(() =>
        res.send({ removed: true }));
};

const methods = { get, post, put, delete: del };


module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};