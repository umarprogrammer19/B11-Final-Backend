import express from "express";
import { createOrder, getOneOrder, getOrders } from "../controllers/orders.controllers.js";

const router = express.Router();

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.get("/orders/:id", getOneOrder);

export default router;