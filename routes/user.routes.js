const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { isRoleValid, isEmailExist, isUserIdExist } = require('../helpers/db_validators');

const { validateCampus, isAdminRole } = require('../middlewares');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email needs to be a valid email').isEmail(),
    check('email').custom( isEmailExist ),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('role').custom( isRoleValid ),
    validateCampus
], usuariosPost );

router.put('/:id', [
    check('id', 'Not a valid ID').isUUID(),  // Use isUUID for UUID validation
    check('id').custom( isUserIdExist ),
    check('role').custom( isRoleValid ),
    validateCampus
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    isAdminRole,
    check('id', 'Not a valid ID').isUUID(),
    check('id').custom(isUserIdExist),
    validateCampus
], usuariosDelete);

module.exports = router;
