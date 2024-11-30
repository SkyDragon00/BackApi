const { Recommendation } = require('../models/recommendation');
const { Game } = require('../models/game');
const { Purchase } = require('../models/purchase');
const { Sequelize, Op } = require('sequelize');

const generateRecommendations = async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch purchased games and their tags/seasons
        const purchases = await Purchase.findAll({
            where: { userId },
            include: [Game],
        });

        const ownedTags = new Set();
        const ownedSeasons = new Set();

        purchases.forEach((purchase) => {
            const { tags, season } = purchase.Game;
            tags.forEach(tag => ownedTags.add(tag));
            season.forEach(seasonTag => ownedSeasons.add(seasonTag));
        });

        const ownedGameIds = purchases.map(p => p.gameId);

        // Convert tags and seasons to arrays
        const tagsArray = Array.from(ownedTags);
        const seasonsArray = Array.from(ownedSeasons);

        // Build dynamic conditions for tags and seasons
        const tagConditions = tagsArray.map(tag => ({
            tags: { [Op.like]: `%${tag}%` },
        }));

        const seasonConditions = seasonsArray.map(season => ({
            season: { [Op.like]: `%${season}%` },
        }));

        // Fetch games matching tags or seasons but not already owned
        const recommendedGames = await Game.findAll({
            where: {
                id: { [Op.notIn]: ownedGameIds },
                [Op.or]: [...tagConditions, ...seasonConditions],
            },
        });

        // Store recommendations in the database
        const recommendations = recommendedGames.map(game => ({
            userId,
            gameId: game.id,
            reason: `Similar tags: ${game.tags.join(', ')} or season match: ${game.season.join(', ')}`,
        }));

        await Recommendation.bulkCreate(recommendations);

        res.status(201).json({ message: 'Recommendations generated successfully', recommendations });
    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getRecommendations = async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch recommendations for the user
        const recommendations = await Recommendation.findAll({
            where: { userId },
            include: [Game], // Include the associated game details
        });

        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { generateRecommendations, getRecommendations };
