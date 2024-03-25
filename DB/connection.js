

const mongoose = require('mongoose');

const connection_string = process.env.CONNECTION_STRING;

mongoose.connect(connection_string).then((res) => {
    console.log('Mongo DB connected successfully');
}).catch((err) => {
    console.log(`Mongo DB connection failed ${err}`);
})