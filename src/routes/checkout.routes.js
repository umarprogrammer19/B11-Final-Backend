import express from "express";
import { checkout } from "../controllers/payment.controllers";

const router = express.Router();

router.post("/checkout", checkout);

export default router;