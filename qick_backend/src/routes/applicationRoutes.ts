import express from "express";

import { signup, login } from "../controllers/authController";
import {
  generate_Order,
  getAllOrders,
  updateOrder,
  OrdersByStatus,
  OrdersByDate,
  // dateAndRange,
} from "../controllers/orderControlers";

const router = express.Router();

router.post("/user/register", signup);
router.post("/user/login", login);
// order routes
router.post("/order/createorder", generate_Order);
router.get("/orders", getAllOrders);
router.get("/orders/status", OrdersByStatus);
router.get("/orders/date", OrdersByDate);
// router.get("/orders/range", dateAndRange);

router.patch("/order/:id", updateOrder);

export default router;
