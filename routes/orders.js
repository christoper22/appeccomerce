const {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  statusChange,
} = require("../controllers/orders");

const router = require("express").Router();
const verifyToken = require("../middleware/validation/verifyToken");
const validation = require("../middleware/validation/validationMiddleware");
const addUpdateOrderSchema = require("../middleware/validationJoi/addOrder");

router.get("/", verifyToken, getOrders);
router.post("/", verifyToken, validation(addUpdateOrderSchema), addOrder);
router.patch(
  "/:idorder",
  verifyToken,
  validation(addUpdateOrderSchema),
  verifyToken,
  updateOrder
);
router.delete("/:idorder", verifyToken, deleteOrder);
router.patch("/:idorder/:status", verifyToken, statusChange);

module.exports = router;
