const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { User } = require('../models/user');
const { Role } = require('../models/role');
const { validationResult } = require('express-validator');

const usuariosGet = async (req = request, res = response) => {
    const { limit = 5, desde = 0 } = req.query;

    try {
        const [total, users] = await Promise.all([
            User.count({ where: { status: true } }),
            User.findAll({
                where: { status: true },
                offset: Number(desde),
                limit: Number(limit)
            })
        ]);

        res.json({
            total,
            users
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

const usuariosPost = async (req, res = response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json(err);
    }

    const { name, email, password, role } = req.body;

    // Check if email exists
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
        return res.status(400).json({
            message: 'Email already exists'
        });
    }

    // Check if role exists in the Role table
    const roleExists = await Role.findOne({ where: { role } });
    if (!roleExists) {
        return res.status(400).json({
            message: `Role ${role} does not exist`
        });
    }

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    const hashedPassword = bcryptjs.hashSync(password, salt);

    try {
        // Create the user, linking it with the roleId
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            roleId: roleExists.id  // Asignar el roleId del rol encontrado
        });
        
        // Return the newly created user
        res.status(201).json({
            name: user.name,
            email: user.email,
            id: user.id,
            role: roleExists.role
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            error: 'Error creating user',
            message: error.message
        });
    }
};

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { password, from_google, email, ...rest } = req.body;

    // Update password if provided
    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    try {
        const user = await User.update(rest, { where: { id } });
        res.json({
            user
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
};

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    try {
        const user = await User.update({ status: false }, { where: { id } });
        res.json({
            user
        });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};

const usuariosPatch = (req, res = response) => {
    res.json({
        message: 'patch api - controller'
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
};