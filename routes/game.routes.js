const { Router } = require('express');
const { check } = require('express-validator');
const { validateCampus } = require('../middlewares/checkcampus');
const { getAllGames, createGame } = require('../controllers/game.controller');


const router = Router();
const validTags = ['Action', 'Platform', 'Sandbox', 'Horror', 'Shooter', 'Halloween', 'Christmass', 'RPG', 'Adventure', 'Sports', 'Fighting', 'Rhythm'];


router.post('/add', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price must be a valid number').isNumeric(),
    check('tags').optional().isArray(),
    check('tags.*').optional().isIn(validTags),
    validateCampus
], createGame);

router.get('/all', getAllGames);

module.exports = router;