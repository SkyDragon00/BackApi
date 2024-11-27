const { response } = require('express');
const { Game } = require('../models/game');

const createGame = async (req, res = response) => {
    const { name, description, price } = req.body;

    try {
        const game = await Game.create({
            name,
            description,
            price,
        });

        res.status(201).json({
            message: 'Game created successfully',
            game,
        });
    } catch (error) {
        console.error('Error creating game:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

module.exports = {
    createGame,
};
