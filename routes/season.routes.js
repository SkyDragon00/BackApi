const { Router } = require('express');
const { createSeason, getSeasons, updateSeason, deleteSeason } = require('../controllers/season.controller');
const { check } = require('express-validator');
const { validateCampus } = require('../middlewares/checkcampus');

const router = Router();

// Create a new season
router.post('/', [
    check('name', 'Name is required').notEmpty(),
    check('startDate', 'Start date is required').isISO8601(),
    check('endDate', 'End date is required').isISO8601(),
    validateCampus,
], createSeason);

// Get all seasons
router.get('/', getSeasons);

// Update a season
router.put('/:id', [
    check('id', 'ID must be an integer').isInt(),
    validateCampus,
], updateSeason);

// Delete a season
router.delete('/:id', [
    check('id', 'ID must be an integer').isInt(),
    validateCampus,
], deleteSeason);

router.get('/current', getSeasons);

module.exports = router;
