import Stripe from "stripe";

// Define the base URL
const BASE_URL = process.env.NODE_ENV === "production"
    ? "https://uf-furniro-store.vercel.app"
    : "http://localhost:3000";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const checkout = async (req, res) => {
    if (!req.user) return res.status(400).json({ message: "Unauthorized" });
    try {
        const userId = req.user._id;
        const { products } = req.body;
        // Validate products
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid or empty products array" });
        }

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
                    unit_amount: item.price * 100, // Stripe uses cents
                },
                quantity: item.quantity,
            };
        });

        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${BASE_URL}/payment/success`,
            cancel_url: `${BASE_URL}/payment/cancel`,
            metadata: {
                products: JSON.stringify(products),
                userId: String(userId)
            },
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error("Stripe checkout error:", error.message);
        res.status(500).json({ error: "Failed to create checkout session", details: error.message });
    }
};
