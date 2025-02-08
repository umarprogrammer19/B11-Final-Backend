import express from "express";
import { getAllOrders } from "../handlers/orders.handlers.js";
import { authenticateAdmin } from "../middleware/admin.middleware.js";
const router = express.Router();

router.post("/orders", authenticateAdmin, getAllOrders);

export default router;