const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async( req = request, res = response, next) => {
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);

        // Encontrar el usuario con ese uid
        req.user = await User.findById(uid);

        if(!req.user){
            return res.status(401).json({
                msg: "Token no valido - usuario no existe en DB"
            })
        }

        if(!req.user.status){
            return res.status(401).json({
                msg: "Token no valido - usuario con estado: false"
            })
        }

        next();
    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: "Token no valido"
        })
    }
}

module.exports = validateJWT;