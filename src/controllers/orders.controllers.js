import productsModels from "../models/products.models.js";
import usersModels from "../models/users.models.js";
import orderModels from "../models/orders.models.js";

export const createOrder = async (req, res) => {
    try {
        const { userId, products } = req.body;
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