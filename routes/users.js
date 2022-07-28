const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/users')
const router = require('express').Router()
const verifyToken = require('../middleware/validation/verifyToken')


router.get('/', getUsers);//get user for validation
router.post('/', addUser);//add new user from register
router.patch('/:id',verifyToken, updateUser);
router.delete('/:id',verifyToken, deleteUser);

module.exports = router