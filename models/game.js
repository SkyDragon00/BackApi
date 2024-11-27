const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const databasePath = path.resolve(__dirname, '../database/database.sqlite');
console.log('Ruta de la base de datos:', databasePath);

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: databasePath,
});

const Game = sequelize.define('Game', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    tags: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field
        get() {
            return this.getDataValue('tags') ? this.getDataValue('tags').split(',') : [];
        },
        set(tags) {
            this.setDataValue('tags', tags.join(','));
        },
    },
}, {
    timestamps: true,
});

sequelize.sync({ force: false }).then(() => {
    console.log('Tablas sincronizadas');
}).catch((error) => {
    console.error('Error sincronizando las tablas:', error);
});

module.exports = { Game, sequelize };
