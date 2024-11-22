
const checkcampus = require('./checkcampus');
const isRolAdmin = require('./isRolAdmin');
const validatejwt = require('./validate-jwt');

module.exports = {
    ...checkcampus,
    ...isRolAdmin,
    ...validatejwt
};
