const { getItems, addItem, updateItem, deleteItem } = require('../controllers/items')

const router = require('express').Router()
const verifyToken = require('../middleware/validation/verifyToken')

router.get('/items/', getItems)
router.post('/:id/items/',verifyToken, addItem)
router.patch('/:id/items/:iditem',verifyToken, updateItem)
router.delete('/:id/items/:iditem',verifyToken, deleteItem)

module.exports = router