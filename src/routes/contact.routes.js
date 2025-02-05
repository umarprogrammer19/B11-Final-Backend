import express from "express";
import { getContactForm } from "../controllers/contact.controllers.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact form submission and email notification
 */

/**
 * @swagger
 * /api/v5/contact:
 *   post:
 *     summary: Submit a contact form
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "umarprogrammer"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "umarofficial0121@gmail.com"
 *               subject:
 *                 type: string
 *                 example: "Contact Form Testing 3"
 *               message:
 *                 type: string
 *                 example: "Testing 3"
 *     responses:
 *       201:
 *         description: Contact form submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Your Application Submitted Successfully"
 *                 response:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "umarprogrammer"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "umarofficial0121@gmail.com"
 *                     subject:
 *                       type: string
 *                       example: "Contact Form Testing 3"
 *                     message:
 *                       type: string
 *                       example: "Testing 3"
 *                     _id:
 *                       type: string
 *                       example: "67a39b8a8d604c8081b4f10d"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-05T17:10:34.920Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-05T17:10:34.920Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All Fields Are Required"
 *       500:
 *         description: Server error or failed to process contact request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cannot Submit Contact Application"
 */

router.post("/contact", getContactForm);

export default router;
