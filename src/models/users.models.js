import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer',
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
    }],
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return;
    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;
    next();
})

export default mongoose.model('users', userSchema);