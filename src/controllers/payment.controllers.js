import Stripe from "stripe";

// BAse URL For Production And Deployment
const BASE_URL = process.env.NODE_ENV === "production" ? "https://uf-furniro-store.vercel.app" || "https://ui-ux-hackathon-foodtuck-website.vercel.app" || "https://uf-food-tuck.vercel.app" : "http://localhost:3000";
let key;
if (process.env.STRIPE_SECRET) key = process.env.STRIPE_SECRET;

const stripe = new Stripe(key);

export const checkout = async (req, res) => {
    try {
        const { products, totalPrice } = req.body;

        if (!req.user) return res.status(400).json({ message: "Unauthorized" });

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
            success_url: `${BASE_URL}/payment/success?success=true`,
            cancel_url: `${BASE_URL}/payment/cancel`,
            metadata: {
                userId: req.user._id.toString(),
                products: JSON.stringify(products),
                totalPrice: totalPrice.toString(),
            },
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error("Stripe checkout error:", error.message);
        res.status(500).json({ error: "Failed to create checkout session", details: error.message });
    }
};