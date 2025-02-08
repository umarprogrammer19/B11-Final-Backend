import ordersModels from "../../models/orders.models.js";

export const getAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        const orders = await ordersModels.find()
            .skip(skip)
            .limit(limit);

        const totalOrders = await usersModels.countDocuments();
        res.status(200).json({
            message: "Order Retrives Successfully",
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            totalOrders,
            orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};