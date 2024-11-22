const { response, request } = require("express")

const isAdminRole = (req = request, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            message: 'Trying to verify role without validating token first'
        });
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            message: `${name} is not an admin`
        });
    }

    next();
}

module.exports = {
    isAdminRole
}