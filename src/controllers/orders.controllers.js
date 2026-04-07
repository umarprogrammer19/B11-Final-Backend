import productsModels from "../models/products.models.js";
import usersModels from "../models/users.models.js";
import orderModels from "../models/orders.models.js";
import furniroModels from "../models/furniro.models.js";
import mongoose from "mongoose";
import { transporter } from "./users.controllers.js";
import { generateOrderHistoryHTML } from "../pages/orderEmailFormat.js";

export const createOrder = async (req, res) => {
    try {
        const { products } = req.body;
        if (!req.user) return res.status(404).json({ message: "Unauthorized" });
        const userId = req.user._id;
        const user = await usersModels.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: 'Products array is required and cannot be empty' });
        }
        const productDocs = await productsModels.find({ _id: { $in: products } });
        if (productDocs.length !== products.length) {
            return res.status(400).json({ error: 'One or more products are invalid' });
        }
        const totalPrice = productDocs.reduce((sum, product) => sum + product.price, 0);
        const newOrder = new orderModels({
            user: userId,
            products,
            totalPrice,
        });
        await newOrder.save();
        res.status(201).json({
            message: 'Order placed successfully',
            order: newOrder,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createOrderAfterPayment = async (req, res) => {
    try {
        const { products, totalPrice, sessionId } = req.body;

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

        // Reduce stock for each product in the order
        for (const orderProduct of products) {
            // Find product by name (since we're receiving name/price/quantity from frontend)
            const product = await productsModels.findOne({ 
                title: orderProduct.name,
                price: orderProduct.price 
            });

            if (product) {
                // Check if there's enough stock
                if (product.stock < orderProduct.quantity) {
                    return res.status(400).json({ 
                        error: `Insufficient stock for ${product.title}. Available: ${product.stock}` 
                    });
                }

                // Reduce the stock
                product.stock -= orderProduct.quantity;
                await product.save();
            }
        }

        // Save the order with the products array
        const newOrder = new furniroModels({
            user: userId,
            products,
            totalPrice: Number(totalPrice),
            stripeSessionId: sessionId || null,
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

export const getOrders = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch orders for the authenticated user
        const orders = await orderModels.find({ user: userId })
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

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch orders for the authenticated user from furniro collection
        const orders = await furniroModels.find({ user: userId })
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

export const getOneOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid order ID' });
        }

        const order = await orderModels.findOne({ _id: id })
            .populate('products', 'name price')
            .populate('user', 'fullname email');
        if (!order) {
            return res.status(404).json({ error: 'Order not found or access denied' });
        }

        res.status(200).json({
            message: 'Order retrieved successfully',
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
