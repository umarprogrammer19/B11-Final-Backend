import express from "express";
import { createOrder, getOneOrder, getOrders } from "../controllers/orders.controllers.js";
import { authenticate } from "../middleware/userRef.middleware.js";
import { createOrderFromFurniro } from "../controllers/furniro.controllers.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - products
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user placing the order.
 *         products:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of product IDs in the order.
 *         totalPrice:
 *           type: number
 *           description: The total price of the order.
 *       example:
 *         user: "63a4c934e857ff001ba94f7c"
 *         products: ["63a4c934e857ff001ba94f7a", "63a4c934e857ff001ba94f7b"]
 *         totalPrice: 300.50
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     security:
 *       - bearerAuth: []
 *     tags: [Orders]
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
 *                   type: string
 *                 example: ["63a4c934e857ff001ba94f7a", "63a4c934e857ff001ba94f7b"]
 *     responses:
 *       201:
 *         description: Order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request (e.g., missing or invalid input).
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */
router.post("/orders", authenticate, createOrder);

/**
 * @swagger
 * /api/v3/furniro-orders:
 *   post:
 *     summary: Create a new order for Furniro
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - products
 *               - totalPrice
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Chair
 *                     price:
 *                       type: number
 *                       example: 2500
 *                     quantity:
 *                       type: number
 *                       example: 2
 *               totalPrice:
 *                 type: number
 *                 example: 5000
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order placed successfully
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64a7a7d7e9f123456789abcd
 *                     user:
 *                       type: string
 *                       example: 64a7a7d7e9f123456789abcd
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: Chair
 *                           price:
 *                             type: number
 *                             example: 2500
 *                           quantity:
 *                             type: number
 *                             example: 2
 *                     totalPrice:
 *                       type: number
 *                       example: 5000
 *       400:
 *         description: Validation error (e.g., invalid or missing fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Products array is required and cannot be empty
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

router.post("/furniro-orders", authenticate, createOrderFromFurniro);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Successfully retrieved orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */
router.get("/orders", authenticate, getOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get details of a specific order by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid order ID.
 *       404:
 *         description: Order not found or access denied.
 *       500:
 *         description: Internal server error.
 */
router.get("/orders/:id", getOneOrder);

export default router;
