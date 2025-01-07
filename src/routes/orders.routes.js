import express from "express";
import { createOrder, getOneOrder, getOrders } from "../controllers/orders.controllers.js";
import { authenticate } from "../middleware/userRef.middleware.js"

const router = express.Router();

router.post("/orders", authenticate, createOrder);
router.get("/orders", authenticate, getOrders);
router.get("/orders/:id", getOneOrder);

export default router;