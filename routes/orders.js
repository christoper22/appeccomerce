const { getOrders, addOrder, updateOrder, deleteOrder,statusChange } = require('../controllers/orders')

const router = require('express').Router()
const verifyToken = require('../middleware/validation/verifyToken') 
    
router.get('/:id/orders/',verifyToken, getOrders)
router.post('/:id/orders/',verifyToken, addOrder)
router.patch('/:id/orders/:idorder',verifyToken, updateOrder)
router.delete('/:id/orders/:idorder',verifyToken, deleteOrder)
router.patch('/:id/orders/:idorder/:status',verifyToken,statusChange)

module.exports = router