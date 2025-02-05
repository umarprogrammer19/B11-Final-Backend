import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        requied: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("contact", contactSchema);