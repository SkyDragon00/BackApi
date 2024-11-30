const { Season } = require('../models/season');

// Create a new season
const createSeason = async (req, res) => {
    const { name, startDate, endDate } = req.body;

    try {
        const season = await Season.create({ name, startDate, endDate });
        res.status(201).json({ message: 'Season created successfully', season });
    } catch (error) {
        console.error('Error creating season:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get all seasons
const getSeasons = async (req, res) => {
    try {
        const seasons = await Season.findAll();
        res.json(seasons);
    } catch (error) {
        console.error('Error fetching seasons:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a season
const updateSeason = async (req, res) => {
    const { id } = req.params;
    const { name, startDate, endDate } = req.body;

    try {
        const season = await Season.findByPk(id);

        if (!season) {
            return res.status(404).json({ message: 'Season not found' });
        }

        await season.update({ name, startDate, endDate });
        res.json({ message: 'Season updated successfully', season });
    } catch (error) {
        console.error('Error updating season:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Delete a season
const deleteSeason = async (req, res) => {
    const { id } = req.params;

    try {
        const season = await Season.findByPk(id);

        if (!season) {
            return res.status(404).json({ message: 'Season not found' });
        }

        await season.destroy();
        res.json({ message: 'Season deleted successfully' });
    } catch (error) {
        console.error('Error deleting season:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = { createSeason, getSeasons, updateSeason, deleteSeason };
