const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../database/database.sqlite')
});

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: 'Role is required' }
        }
    }
});

const createDefaultRoles = async () => {
    const roles = ['USER_ROLE', 'ADMIN_ROLE'];
    
    for (const role of roles) {
        const existingRole = await Role.findOne({ where: { role } });
        if (!existingRole) {
            await Role.create({ role });
            console.log(`Role ${role} created.`);
        }
    }
};

sequelize.sync({ force: false }).then(async () => {
    console.log('Tablas sincronizadas');
    await createDefaultRoles();
}).catch((error) => {
    console.error('Error sincronizando las tablas:', error);
});

module.exports = { Role, sequelize };