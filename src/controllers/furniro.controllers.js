import furniroModels from "../models/furniro.models.js";
import usersModels from "../models/users.models.js";
import { generateOrderHistoryHTML } from "../pages/orderEmailFormat.js";
import { transporter } from "./users.controllers.js";

export const createOrderFromFurniro = async (req, res) => {
    try {
        const { products, totalPrice } = req.body;

        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = req.user._id;

        // Validate user existence
        const user = await usersModels.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Validate products array
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Products array is required and cannot be empty" });
        }

        // Validate totalPrice
        if (typeof totalPrice !== "number" || totalPrice <= 0) {
            return res.status(400).json({ error: "Invalid total price" });
        }

        // Save the order with the products array
        const newOrder = new furniroModels({
            user: userId,
            products,
            totalPrice: Number(totalPrice),
        });

        await newOrder.save();

        const htmlContent = generateOrderHistoryHTML(user, [newOrder]);

        await transporter.sendMail({
            from: '"UF E-Commerce Store"',
            to: `${req.user.email}, ${process.env.EMAIL}`,
            subject: "Your Order History from Furniro",
            html: htmlContent,
        });

        res.status(201).json({
            message: "Order placed successfully",
            order: newOrder,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getOrdersFromFurniro = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch orders for the authenticated user
        const orders = await furniroModels.find({ user: userId })
            .populate('user', '_id fullname email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Orders retrieved successfully',
            orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};