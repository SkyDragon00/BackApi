const { Sequelize, DataTypes } = require('sequelize');
const { Role } = require('./role');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../database/database.sqlite')
});

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Name is required' }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: 'Invalid email format' },
            notEmpty: { msg: 'Email is required' }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'The password is required' }
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

User.belongsTo(Role, { foreignKey: 'roleId', targetKey: 'id' });
Role.hasMany(User, { foreignKey: 'roleId', sourceKey: 'id' });

sequelize.sync({ force: false }).then(() => {
    console.log('Tablas sincronizadas');
}).catch((error) => {
    console.error('Error sincronizando las tablas:', error);
});

module.exports = { User, Role, sequelize };