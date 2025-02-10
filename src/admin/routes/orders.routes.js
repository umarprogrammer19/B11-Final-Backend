import express from "express";
import { getAllOrders, updateStatus } from "../handlers/orders.handlers.js";
import { authenticateAdmin } from "../middleware/admin.middleware.js";
const router = express.Router();

router.get("/orders", authenticateAdmin, getAllOrders);
router.patch("/orders/updateStatus/:id", authenticateAdmin, updateStatus);

export default router;