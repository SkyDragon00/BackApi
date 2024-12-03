const { response } = require('express');
const { Purchase } = require('../models/purchase');
const { Game } = require('../models/game');
const { User } = require('../models/user');

const makePurchase = async (req, res = response) => {
    const { userId, gameId } = req.body;

    try {
        // Check if the game exists
        const game = await Game.findByPk(gameId);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the purchase already exists
        const existingPurchase = await Purchase.findOne({ where: { userId, gameId } });
        if (existingPurchase) {
            return res.status(400).json({ message: 'Game already purchased by user' });
        }

        // Create the purchase
        const purchase = await Purchase.create({ userId, gameId });
        res.status(201).json({ message: 'Purchase successful', purchase });
    } catch (error) {
        console.error('Error making purchase:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getPurchases = async (req, res = response) => {
    const { userId } = req.params;

    try {
        const purchases = await Purchase.findAll({ where: { userId }, include: [Game] });
        res.json(purchases);
    } catch (error) {
        console.error('Error fetching purchases:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const { sequelize } = require('../models/game'); // Use the existing Sequelize instance

const getDateReport = async (req, res) => {
    const { startDate, endDate } = req.query;

    console.log('startDate:', startDate);
    console.log('endDate:', endDate);

    try {
        // Validate date inputs
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Start date and end date are required.' });
        }

        // Query to get user purchase statistics within the date range
        const result = await sequelize.query(
            `
            SELECT 
                Users.id AS userId,
                Users.name AS userName,
                COUNT(Purchases.id) AS totalGamesBought,
                SUM(Games.price) AS totalAmountSpent
            FROM Purchases
            INNER JOIN Users ON Purchases.userId = Users.id
            INNER JOIN Games ON Purchases.gameId = Games.id
            WHERE Purchases.purchaseDate BETWEEN :startDate AND :endDate
            GROUP BY Users.id
            ORDER BY totalGamesBought DESC, totalAmountSpent DESC
            LIMIT 10;
            `,
            {
                type: sequelize.QueryTypes.SELECT,
                replacements: { startDate, endDate },
            }
        );

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching date report:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    makePurchase,
    getPurchases,
    getDateReport,
};
