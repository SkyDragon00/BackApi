const { Role } = require('../models/role');
const { User } = require('../models/user');

const isRoleValid = async (role = '') => {
    const existRole = await Role.findOne({ where: { role } });
    if (!existRole) {
        throw new Error(`Role ${role} is not registered in the DB`);
    }
}

const isEmailExist = async (email = '') => {
    const existEmail = await User.findOne({ where: { email } });
    if (existEmail) {
        throw new Error(`Email ${email} is already registered`);
    }
}

const isUserIdExist = async (id) => {
    const user = await User.findOne({ where: { id } });
    if (!user) {
        throw new Error(`User with ID ${id} does not exist.`);
    }
}

module.exports = {
    isRoleValid,
    isEmailExist,
    isUserIdExist,
}