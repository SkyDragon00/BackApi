const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./game'); // Reuse existing sequelize instance
const { Game } = require('./game');

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

// Define associations
Purchase.belongsTo(Game, { foreignKey: 'gameId', onDelete: 'CASCADE' });
Game.hasMany(Purchase, { foreignKey: 'gameId', onDelete: 'CASCADE' });


sequelize.sync({ force: false }).then(() => {
    console.log('Purchase table synchronized');
}).catch((error) => {
    console.error('Error synchronizing the Purchase table:', error);
});

module.exports = { Purchase, sequelize };
