const { getOrders, addOrder, updateOrder, deleteOrder,statusChange } = require('../controllers/orders')

const router = require('express').Router()
const verifyToken = require('../middleware/validation/verifyToken') 
const { users } = require('../middleware/validation/user')  

router.get('/:id/orders/',verifyToken,users, getOrders)
router.post('/:id/orders/',verifyToken,users, addOrder)
router.patch('/:id/orders/:idorder',verifyToken,users, updateOrder)
router.delete('/:id/orders/:idorder',verifyToken,users, deleteOrder)
router.patch('/:id/orders/:idorder/:status',verifyToken,users,statusChange)

module.exports = router