const { Router } = require('express');
const { check } = require('express-validator');
const { validateCampus } = require('../middlewares/checkcampus');
const { getAllGames, createGame, deleteGame } = require('../controllers/game.controller');
const { makePurchase, getPurchases } = require('../controllers/purchase.controller');

const router = Router();
const validTags = ['Action', 'Platform', 'Sandbox', 'Horror', 'Shooter', 'RPG', 'Adventure', 'Sports', 'Fighting', 'Rhythm'];
const validSeasons = ['Halloween', 'Christmass', 'Valentine', 'Easter'];

router.post('/add', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price must be a valid number').isNumeric(),
    check('tags').optional().isArray(),
    check('tags.*').optional().isIn(validTags),
    check('season').optional().isArray(),
    check('season.*').optional().isIn(validSeasons),
    validateCampus
], createGame);

router.get('/all', getAllGames);

router.delete('/:id', deleteGame);

// Purchase Routes
router.post('/purchase', [
    check('userId', 'User ID is required').isUUID(),
    check('gameId', 'Game ID is required').isInt(),
    validateCampus
], makePurchase);

router.get('/purchases/:userId', getPurchases);

module.exports = router;
