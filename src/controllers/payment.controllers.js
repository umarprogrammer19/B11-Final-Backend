import Stripe from "stripe";

let key;
if (process.env.STRIPE_SECRET) key = process.env.STRIPE_SECRET;

const stripe = new Stripe(key);

export const checkout = async (req, res) => {
    try {
        const { products } = req.body;

        // Validate the products array
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid or empty products array" });
        }

        // Map products to line items for Stripe
        const lineItems = products.map((item) => {
            if (!item.name || !item.price || !item.quantity) {
                throw new Error("Invalid product data. Each product requires name, price, and quantity.");
            }

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100, // Stripe expects amounts in cents
                },
                quantity: item.quantity,
            };
        });

        // Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        // Send session ID to the frontend
        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error("Stripe checkout error:", error.message);
        res.status(500).json({ error: "Failed to create checkout session", details: error.message });
    }
};