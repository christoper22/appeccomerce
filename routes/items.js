const {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} = require("../controllers/items");

const router = require("express").Router();
const verifyToken = require("../middleware/validation/verifyToken");
const validation = require("../middleware/validation/validationMiddleware");
const addItemSchema = require("../middleware/validationJoi/addItem");
const updateItemSchema = require("../middleware/validationJoi/updateItem");

router.get("/", getItems);
router.post("/", verifyToken, validation(addItemSchema), addItem);
router.patch("/:iditem", verifyToken, validation(updateItemSchema), updateItem);
router.delete("/:iditem", verifyToken, deleteItem);

module.exports = router;
