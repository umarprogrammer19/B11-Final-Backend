import { transporter } from "../controllers/users.controllers.js";
import furniroModels from "../models/furniro.models.js";
import usersModels from "../models/users.models.js";
import { generateOrderHistoryHTML } from "../pages/orderEmailFormat.js";
import "dotenv/config";

export const createOrderFromFurniro = async (products, totalPrice, userId) => {
    try {

        const user = await usersModels.findById(userId);
        if (!user) {
            return { error: "User not found" };
        }

        // Validate products array
        if (!Array.isArray(products) || products.length === 0) {
            return { error: "Products array is required and cannot be empty" };
        }

        // Validate totalPrice
        if (typeof totalPrice !== "number" || totalPrice <= 0) {
            return { error: "Invalid total price" };
        }

        // Save the order with the products array
        const newOrder = new furniroModels({
            user: userId,
            products,
            totalPrice,
        });

        await newOrder.save();

        const htmlContent = generateOrderHistoryHTML(user, [newOrder]);

        await transporter.sendMail({
            from: '"UF E-Commerce Store"',
            to: `${user.email}, ${process.env.EMAIL}`,
            subject: "Your Order History from Marketplace",
            html: htmlContent,
        });

        return {
            message: "Order placed successfully",
            order: newOrder,
        };
    } catch (error) {
        console.error(error);
        return { error: "Internal server error" };
    }
};