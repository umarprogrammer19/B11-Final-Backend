import express from "express";
import { getUser, signIn, signUp } from "../controllers/users.controllers.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { authenticate } from "../middleware/userRef.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /api/v1/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - password
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 */
router.post("/signup", signUp);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Validation error or incorrect credentials
 *       404:
 *         description: User not found
 */
router.post("/login", signIn);

/**
 * @swagger
 * /api/v1/verifyUser:
 *   get:
 *     summary: Verify if the user is authenticated
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User is logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hey! You Are Logged In
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *       401:
 *         description: Unauthorized
 */
router.get("/verifyUser", authenticateUser, (req, res) => {
    res.json({ message: "Hey! You Are Logged In", user: req.user });
});

/**
 * @swagger
 * /api/v1/getUser:
 *   get:
 *     summary: Retrieve the authenticated user's details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully Get The User
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 63f24d918b8eaa0c12345678
 *                     fullname:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     orders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           orderId:
 *                             type: string
 *                             example: 63f24d918b8eaa0c12345678
 *                           totalPrice:
 *                             type: number
 *                             example: 2500
 *                           status:
 *                             type: string
 *                             example: pending
 *       401:
 *         description: Unauthorized - User not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please Login First
 */
router.get("/getUser", authenticate, getUser);

export default router;
