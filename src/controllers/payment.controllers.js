import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET);

export const checkout = async (req, res) => {
    const { products } = req.body;
    const lineItems = products.map((item) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ message: "session completed", id: session.id });
};