import express from "express";
import { signup, login } from "../controllers/authController";
import {
  generate_Order,
  getAllOrders,
  updateOrder,
} from "../controllers/orderControlers";

const router = express.Router();

router.post("/user/register", signup);
router.post("/user/login", login);

// order routes

router.post("/order/createorder", generate_Order);
router.get("/orders", getAllOrders);
router.patch("/order/:id", updateOrder);

export default router;
