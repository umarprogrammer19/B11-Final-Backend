import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
    }],

}, { timestamps: true })

export default mongoose.model('products', productSchema);