const express = require('express');
const cors = require('cors');
// const { dbConnection } = require('../database/config.db');

class Server {
    constructor() {
        this.user_path = '/api/users';
        this.auth_path = '/api/auth';

        this.app = express();

        this.port = process.env.PORT || 3000;

        // this.connectDB();

        this.middlewares();

        this.routes();
    }

    async connectDB() {
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // Read and parse body
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.user_path, require('../routes/user.routes'));
        this.app.use(this.auth_path, require('../routes/auth.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }
}

module.exports = Server;