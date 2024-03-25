

require('dotenv').config();  
const express = require('express');
const cors = require('cors');
const routes = require('./Routes/route')

const emServer = express();
require('./DB/connection');
emServer.use(cors());

emServer.use(express.json());
emServer.use(routes);

const Port = 3500;
emServer.listen(Port, () => {
    console.log(`EasyMart server is running in port ${Port}`);
})