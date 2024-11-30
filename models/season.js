const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./game'); // Reuse existing Sequelize instance


const Season = sequelize.define('Season', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure each season has a unique name
        validate: {
            notEmpty: { msg: 'Season name is required' },
        },
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: { msg: 'Start date must be a valid date' },
        },
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: { msg: 'End date must be a valid date' },
            isAfterStart(value) {
                if (value <= this.startDate) {
                    throw new Error('End date must be after the start date');
                }
            },
        },
    },
}, {
    timestamps: true,
});

sequelize.sync({ force: false }).then(() => {
    console.log('Season table synchronized');
}).catch((error) => {
    console.error('Error synchronizing the Season table:', error);
});

module.exports = { Season };
