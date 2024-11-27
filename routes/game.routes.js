const { Router } = require('express');
const { check } = require('express-validator');
const { validateCampus } = require('../middlewares/checkcampus');
const { createGame } = require('../controllers/game.controller');

const router = Router();

router.post('/add', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price must be a valid number').isNumeric(),
    validateCampus
], createGame);

module.exports = router;