import furniroModels from "../../models/furniro.models.js";

export const getAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 15) || 1;
        const limit = parseInt(req.query.limit, 15) || 15;
        const skip = (page - 1) * limit;
        const orders = await furniroModels.find()
            .skip(skip)
            .limit(limit).populate("user");

        const totalOrders = await furniroModels.countDocuments();
        res.status(200).json({
            message: "Order Retrives Successfully",
            currentPage: page,
            totalPages: Math.ceil(totalOrders / limit),
            totalOrders,
            orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};