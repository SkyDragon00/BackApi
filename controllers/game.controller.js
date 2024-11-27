const { response } = require('express');
const { Game } = require('../models/game');

const createGame = async (req, res = response) => {
    const { name, description, price, tags } = req.body;

    try {
        const game = await Game.create({
            name,
            description,
            price,
            tags: tags || [],
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

const getAllGames = async (req, res = response) => {
    try {
        const games = await Game.findAll(); // Fetch all games
        res.json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

module.exports = {
    createGame,
    getAllGames, // Export the new controller
};
