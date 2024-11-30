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

module.exports = {
    makePurchase,
    getPurchases,
};
