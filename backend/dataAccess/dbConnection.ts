const connection = (creds) => {
	const mongoose = require("mongoose");
	const dbOptions = { useUnifiedTopology: true, useNewUrlParser: true, keepAlive: 300000, connectTimeoutMS: 30000};
	// const db = mongoose.connection;
	mongoose.connect( creds , dbOptions);
	mongoose.set("useCreateIndex", true);
};

export {
	connection
};