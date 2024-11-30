const { Router } = require('express');
const { generateRecommendations, getRecommendations } = require('../controllers/recommendation.controller');
const { check } = require('express-validator');
const { validateCampus } = require('../middlewares/checkcampus');

const router = Router();

router.post('/generate/:userId', [
    check('userId', 'User ID is required').isUUID(),
    validateCampus,
], generateRecommendations);

router.get('/:userId', [
    check('userId', 'User ID is required').isUUID(),
    validateCampus,
], getRecommendations);

module.exports = router;
