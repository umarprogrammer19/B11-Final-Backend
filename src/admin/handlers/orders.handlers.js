import mongoose from "mongoose";
import furniroModels from "../../models/furniro.models.js";

export const getAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
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

export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!req.user) return res.status(401).json({ message: "Please Login First" });

        // Validate status
        const validStatuses = ["pending", "completed", "shipped"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        // Find order
        const order = await furniroModels.findById(id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = status;
        await order.save();

        return res.status(200).json({ message: "Order status updated successfully", order });
    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id is Missing" });
    if (!req.user) return res.status(400).json({ message: "Please Login First" });
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "Invalid Id" });

    try {
        const isOrder = furniroModels.findById(id);
        if (!isOrder) res.status(404).json({ message: "Order Not Found" });

        const order = await furniroModels.findByIdAndDelete(id);
        res.status(200).json({ message: "Order deleted successfully", order });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "An error occurred" });
    }
}