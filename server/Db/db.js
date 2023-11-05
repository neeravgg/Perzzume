const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});
const connection = mongoose.connection;
function connectDb() {
	connection.on('connected', () => {
		console.log('connection successfull');
	});
	connection.on('error', () => {
		console.log('connection failed');
	});
}

function gfs() {
	let gfs;
	connection.once('open', () => {
		// initialize stream
		gfs = new mongoose.mongo.GridFSBucket(connection.db, {
			bucketName: 'uploads',
		});
	});
	return gfs;
}

module.exports = { connectDb, gfs };
