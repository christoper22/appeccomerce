const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/users')
const router = require('express').Router()
const verifyToken = require('../middleware/validation/verifyToken')
const { register,users } = require('../middleware/validation/user')


router.get('/', getUsers);//get user for validation
router.post('/',register, addUser);//add new user from register
router.patch('/:id',verifyToken,users, updateUser);
router.delete('/:id',verifyToken,users, deleteUser);

module.exports = router