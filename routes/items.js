const { getItems, addItem, updateItem, deleteItem } = require('../controllers/items')

const router = require('express').Router()
const verifyToken = require('../middleware/validation/verifyToken')

router.get('/items/', getItems)
router.post('/items/',verifyToken, addItem)
router.patch('/items/:iditem',verifyToken, updateItem)
router.delete('/items/:iditem',verifyToken, deleteItem)

module.exports = router