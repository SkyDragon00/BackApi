const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const { sequelize } = require('./game'); // Reuse existing sequelize instance

const Purchase = sequelize.define('Purchase', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    purchaseDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    timestamps: true,
});

sequelize.sync({ force: false }).then(() => {
    console.log('Purchase table synchronized');
}).catch((error) => {
    console.error('Error synchronizing the Purchase table:', error);
});

module.exports = { Purchase, sequelize };
