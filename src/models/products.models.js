import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    discountPercentage: {
        type: Number,
        default: 0
    },
    isNew: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        required: true,
        enum: ["chair", "sofa", "light", "bed", "table", "items"],
        default: "items"
    }
}, { timestamps: true });

const Product = mongoose.model("products", productSchema);

export default Product;
