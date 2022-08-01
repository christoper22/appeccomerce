const { getItems, addItem, updateItem, deleteItem } = require('../controllers/items')

const router = require('express').Router()
const verifyToken = require('../middleware/validation/verifyToken')
const validation = require('../middleware/validation/validationMiddleware')
const addItemSchema = require('../middleware/validationJoi/addItem')
const updateItemSchema = require('../middleware/validationJoi/updateItem')

router.get('/items/', getItems)
router.post('/items/',verifyToken,validation(addItemSchema),addItem)
router.patch('/items/:iditem',verifyToken,validation(updateItemSchema),updateItem)
router.delete('/items/:iditem',verifyToken, deleteItem)

module.exports = router