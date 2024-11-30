const express = require('express');
const cors = require('cors');

// const { dbConnection } = require('../database/config.db');
//const { SNAPSHOT } = require('sequelize/lib/table-hints');


class Server {
    constructor() {
        this.user_path = '/api/users';
        this.auth_path = '/api/auth';
        this.game_path = '/api/game';
        this.recommendation_path = '/api/recommendations';
        this.season_path = '/api/seasons';

        this.app = express();

        this.port = process.env.PORT || 3000;

        //this.connectDB();


        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    async connectDB() {
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // Leer y parsear el body
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.user_path, require('../routes/user.routes'));
        this.app.use(this.auth_path, require('../routes/auth.routes'));
        this.app.use(this.game_path, require('../routes/game.routes'));
        this.app.use(this.recommendation_path, require('../routes/recommendation.routes'));
        this.app.use(this.season_path, require('../routes/season.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }
    
}

module.exports = Server;

