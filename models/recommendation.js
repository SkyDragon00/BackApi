const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./game'); // Reuse the existing Sequelize instance
const { Game } = require('./game');

const Recommendation = sequelize.define('Recommendation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Games',
            key: 'id',
        },
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

Recommendation.belongsTo(Game, { foreignKey: 'gameId', onDelete: 'CASCADE' });
Game.hasMany(Recommendation, { foreignKey: 'gameId', onDelete: 'CASCADE' });


sequelize.sync({ force: false }).then(() => {
    console.log('Recommendations table synchronized');
}).catch((error) => {
    console.error('Error synchronizing the Recommendations table:', error);
});

module.exports = { Recommendation };
