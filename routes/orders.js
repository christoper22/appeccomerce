const { getOrders, addOrder, updateOrder, deleteOrder,statusChange } = require('../controllers/orders')

const router = require('express').Router()

router.get('/:id/orders/', getOrders)
router.post('/:id/orders/', addOrder)
router.patch('/:id/orders/:idorder', updateOrder)
router.delete('/:id/orders/:idorder', deleteOrder)
router.patch('/:id/orders/:idorder/:status',statusChange)

module.exports = router