import express from "express";
import { authenticateAdmin } from "../admin/middleware/admin.middleware.js";
import { addProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from "../controllers/product.controllers.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */

/**
 * @swagger
 * /api/v2/addProducts:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *               - image
 *             properties:
 *               title:
 *                 type: string
 *                 example: iPhone 14
 *               description:
 *                 type: string
 *                 example: The latest iPhone model
 *               price:
 *                 type: number
 *                 example: 999
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Validation error or missing fields
 *       401:
 *         description: Unauthorized
 */
router.post("/addProducts", authenticateAdmin, upload.single("image"), addProduct);

/**
 * @swagger
 * /api/v2/products:
 *   get:
 *     summary: Get all products with pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of products per page
 *     responses:
 *       200:
 *         description: A list of products with pagination info
 *       500:
 *         description: Internal server error
 */
router.get("/products", getProducts);

/**
 * @swagger
 * /api/v2/products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *       400:
 *         description: Missing product ID
 *       404:
 *         description: Product not found
 */
router.get("/products/:id", getSingleProduct);

/**
 * @swagger
 * /api/v2/updateProduct/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated iPhone 14
 *               description:
 *                 type: string
 *                 example: Updated description
 *               price:
 *                 type: number
 *                 example: 1099
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Missing or invalid fields
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized to update this product
 *       404:
 *         description: Product not found
 */
router.patch("/updateProduct/:id", authenticateAdmin, upload.single("image"), updateProduct);

/**
 * @swagger
 * /api/v2/deleteProduct/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Missing product ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized to delete this product
 *       404:
 *         description: Product not found
 */
router.delete("/deleteProduct/:id", authenticateAdmin, deleteProduct);

export default router;
