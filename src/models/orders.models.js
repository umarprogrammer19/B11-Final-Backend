import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    }],
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'shipped'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

export default mongoose.model('orders', orderSchema);
