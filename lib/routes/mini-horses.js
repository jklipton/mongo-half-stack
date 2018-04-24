const MiniHorse = require('../models/mini-horse');
const errorHandler = require('../util/error-handler');

module.exports = function(server) {
    server.post('/mini-horses', (req, res) => {
        MiniHorse.create(req.body)
            .then(miniHorse => res.json(miniHorse))
            .catch(err => errorHandler(err, req, res));
    });
    
    server.get('/mini-horses', (req, res) => {
        MiniHorse.find(req.query)
            .lean()
            .then(miniHorse => res.json(miniHorse))
            .catch(err => errorHandler(err, req, res));
    });

    server.get('/mini-horses/:id', (req, res) => {
        const { id } = req.params;

        MiniHorse.findById(id)
            .lean()
            .then(miniHorse => {
                if(!miniHorse){
                    errorHandler({
                        status: 404,
                        error: `No horse at ${id}`
                    }, req, res);
                }
                else res.json(miniHorse);
            })
            .catch(err => errorHandler(err, req, res));
    });

    server.put('/mini-horses/:id', (req, res) => {
        MiniHorse.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updated => res.json(updated))
            .catch(err => errorHandler(err, req, res));
    });

    server.del('/mini-horses/:id', (req, res) => {
        MiniHorse.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }))
            .catch(err => errorHandler(err, req, res));
    });

};
