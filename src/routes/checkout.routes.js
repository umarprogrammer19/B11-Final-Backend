import express from "express";
import { checkout } from "../controllers/payment.controllers.js";
import { authenticate } from "../middleware/userRef.middleware.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment and checkout operations
 */

/**
 * @swagger
 * /api/v4/checkout:
 *   post:
 *     summary: Create a Stripe checkout session for payment
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Laptop
 *                     price:
 *                       type: number
 *                       example: 1000
 *                     quantity:
 *                       type: number
 *                       example: 1
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: cs_test_a1b2c3d4e5f6g7h8i9j0
 *       400:
 *         description: Invalid or missing products array
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid or empty products array
 *       500:
 *         description: Server error or Stripe session creation failure
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to create checkout session
 *                 details:
 *                   type: string
 *                   example: "Invalid product data. Each product requires name, price, and quantity."
 */

router.post("/checkout", authenticate, checkout);

export default router;