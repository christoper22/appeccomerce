const { getItems, addItem, updateItem, deleteItem } = require('../controllers/items')

const router = require('express').Router()

router.get('/items/', getItems)
router.post('/:id/items/', addItem)
router.patch('/:id/items/:iditem', updateItem)
router.delete('/:id/items/:iditem', deleteItem)

module.exports = router