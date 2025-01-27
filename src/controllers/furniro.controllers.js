import furniroModels from "../models/furniro.models.js";

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
            totalPrice,
        });

        await newOrder.save();

        res.status(201).json({
            message: "Order placed successfully",
            order: newOrder,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

