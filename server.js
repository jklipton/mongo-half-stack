var restify = require('restify');
const mongoose = require('mongoose');
const restifyPlugins = require('restify-plugins');
const miniHorses = require('./lib/routes/mini-horses');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-horses';

const server = restify.createServer({ name: 'mongo'});

server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

server.listen(PORT, () => {
	// establish connection to mongodb
	mongoose.Promise = global.Promise;
	mongoose.connect(MONGODB_URI);

	const db = mongoose.connection;

	db.on('error', (err) => {
	    console.error(err);
	    process.exit(1);
	});

	db.once('open', () => {
	    require('./lib/routes/mini-horses')(server);
	    console.log(`Server is listening on port ${PORT}`);
	});
});

module.exports = server;