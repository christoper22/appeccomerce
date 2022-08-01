const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/users')
const router = require('express').Router()
const verifyToken = require('../middleware/validation/verifyToken')
const { register } = require('../middleware/validation/user')
const validation = require('../middleware/validation/validationMiddleware')
const loginUserSchema = require('../middleware/validationJoi/login')
const registerUpdateSchema = require('../middleware/validationJoi/register')

router.get('/',validation(loginUserSchema), getUsers);//get user for validation
router.post('/',validation(registerUpdateSchema),register, addUser);//add new user from register
router.patch('/',verifyToken,validation(registerUpdateSchema),updateUser);
router.delete('/',verifyToken, deleteUser);

module.exports = router