import mongoose from "mongoose";
import usersModels from "./users.models.js";

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
        ref: usersModels,
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }],

}, { timestamps: true })

export default mongoose.model('Products', productSchema);