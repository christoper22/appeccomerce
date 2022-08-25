const {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} = require('../controllers/items');

const router = require('express').Router();
const verifyToken = require('../middleware/validation/verifyToken');
const validation = require('../middleware/validation/validationMiddleware');
const addItemSchema = require('../middleware/validationJoi/addItem');
const updateItemSchema = require('../middleware/validationJoi/updateItem');
const roleValidation = require('../middleware/validation/authorization');

router.get('/', getItems);
router.post(
  '/',
  verifyToken,
  roleValidation('admin'),
  validation(addItemSchema),
  addItem
);
router.patch(
  '/:iditem',
  verifyToken,
  roleValidation('admin'),
  validation(updateItemSchema),
  updateItem
);
router.delete('/:iditem', verifyToken, roleValidation('admin'), deleteItem);

module.exports = router;
