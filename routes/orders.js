const { getOrders, addOrder, updateOrder, deleteOrder,statusChange } = require('../controllers/orders')

const router = require('express').Router()
const verifyToken = require('../middleware/validation/verifyToken')  
const validation = require('../middleware/validation/validationMiddleware')
const addUpdateOrderSchema = require('../middleware/validationJoi/addOrder')


router.get('/orders/',verifyToken, getOrders)
router.post('/orders/',verifyToken,validation(addUpdateOrderSchema),addOrder)
router.patch('/orders/:idorder',verifyToken,validation(addUpdateOrderSchema),verifyToken,updateOrder)
router.delete('/orders/:idorder',verifyToken, deleteOrder)
router.patch('/orders/:idorder/:status', verifyToken, statusChange)

module.exports = router