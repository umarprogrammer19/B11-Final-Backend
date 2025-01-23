import productsModels from "../models/products.models.js";
import usersModels from "../models/users.models.js";
import orderModels from "../models/orders.models.js";
import mongoose from "mongoose";

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

export const getOrders = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch orders for the authenticated user
        const orders = await orderModels.find({ user: userId })
            .populate('products')
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
