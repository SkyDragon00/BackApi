const { response } = require('express');
const { Game } = require('../models/game');
const { Season } = require('../models/season');
const { Op } = require('sequelize');

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

const getGamesByCurrentSeason = async (req, res) => {
    try {
        // Get the current date
        const currentDate = new Date();
        //console.log("drfgtyhyuhuh" + currentDate.toString());

        // Find the active season
        const activeSeason = await Season.findOne({
            where: {
                startDate: { [Op.lte]: currentDate },
                endDate: { [Op.gte]: currentDate },
            },
        });

        let games;
        if (activeSeason) {
            // Fetch games matching the active season
            games = await Game.findAll({
                where: {
                    season: { [Op.like]: `%${activeSeason.name}%` }, // Match the active season's name
                },
            });
        } else {
            // Fetch "Unseasoned" games if no active season is found
            games = await Game.findAll({
                where: {
                    season: { [Op.like]: `%Unseasoned%` },
                },
            });
        }

        res.status(200).json({
            season: activeSeason ? activeSeason.name : 'Unseasoned',
            games,
        });
    } catch (error) {
        console.error('Error fetching games by current season:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Export all functions in a single object
module.exports = {
    createGame,
    getAllGames,
    deleteGame,
    getGamesByCurrentSeason,
};
