
import Stripe from "stripe";
import furniroModels from "../models/furniro.models.js"; // Import your order model
import usersModels from "../models/users.models.js"; // Import user model
import { generateOrderHistoryHTML } from "../pages/orderEmailFormat.js";
import dotenv from "dotenv";
import { transporter } from "./users.controllers.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const webhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error("⚠️ Webhook signature verification failed.", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        try {
            const products = JSON.parse(session.metadata.products);
            const totalPrice = session.amount_total / 100; // Stripe sends amount in cents
            const userId = session.metadata.userId;

            // Validate user
            const user = await usersModels.findById(userId);
            if (!user) {
                console.error("❌ User not found:", userId);
                return res.status(404).json({ error: "User not found" });
            }

            // Create order in the database
            const newOrder = new furniroModels({
                user: userId,
                products,
                totalPrice,
                status: "completed",
            });

            await newOrder.save();

            // Send email confirmation
            const htmlContent = generateOrderHistoryHTML(user, [newOrder]);
            await transporter.sendMail({
                from: '"UF E-Commerce Store"',
                to: `${user.email}, ${process.env.EMAIL}`,
                subject: "Your Order History from Furniro",
                html: htmlContent,
            });

            console.log("✅ Order successfully created after payment!");
            return res.status(200).json({ received: true });
        } catch (error) {
            console.error("❌ Error creating order after payment:", error);
            return res.status(500).json({ error: "Failed to create order." });
        }
    }

    res.status(200).json({ received: true });
};

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
