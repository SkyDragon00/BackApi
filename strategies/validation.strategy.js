const { Role } = require('../models/role');
const { User } = require('../models/user');

const validateEmail = async (email) => {
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
        throw new Error('Email already exists');
    }
};

const validateRole = async (role) => {
    const roleExists = await Role.findOne({ where: { role } });
    if (!roleExists) {
        throw new Error(`Role ${role} does not exist`);
    }
    return roleExists.id; // Devuelve el roleId si es válido
};

module.exports = { validateEmail, validateRole };