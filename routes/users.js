const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/users')
const router = require('express').Router()


router.get('/', getUsers);//get user for validation
router.post('/', addUser);//add new user from register
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router