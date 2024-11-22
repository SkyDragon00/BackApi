//instances
require('dotenv').config();

// our import
const Server = require('./models/server');

const server = new Server();

server.listen();