const { response } = require('express');
const { Game } = require('../models/game');

const createGame = async (req, res = response) => {
    const { name, description, price, tags, season } = req.body;

    try {
        const game = await Game.create({
            name,
            description,
            price,
            tags: tags || [],
            season: season || []
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

const deleteGame = async (req, res = response) => {
    const { id } = req.params;

    try {
        const game = await Game.findByPk(id);

        if (!game) {
            return res.status(404).json({
                message: 'Game not found',
            });
        }

        await game.destroy(); // Delete the game
        res.json({
            message: `Game with ID ${id} deleted successfully`,
        });
    } catch (error) {
        console.error('Error deleting game:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};

module.exports = {
    createGame,
    getAllGames,
    deleteGame,
};