import usersModels from "../models/users.models.js";

const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET, {
        expiresIn: "6h",
    });
};
const generateRefreshToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET, {
        expiresIn: "7d",
    });
};

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'makenna.mohr0@ethereal.email',
        pass: 'bbufvNSdZMJtXMMrUU'
    }
});


// Sign Up Api 
export const signUp = async (req, res) => {
    const { fullname, email, password } = req.body;
    if (!fullname) return res.status(400).json({ message: "full Name is required" });
    if (!email) return res.status(400).json({ message: "email is required" });
    if (!password) return res.status(400).json({ message: "password is required" });
    try {
        const user = await usersModels.findOne({ email })
        if (user) return res.status(400).json({ message: "user already exits" });

        await usersModels.create({ fullname, email, password });
        await transporter.sendMail({
            from: '"Umar Farooq👻" <vernie11@ethereal.email>',
            to: "umarofficial0121@gmail.com",
            subject: "Hello Umar✔",
            text: "Successfully Learn nodemailer",
            html: "<b>Hello world ?</b>",
        });

        res.status(200).json({ message: "user register successfully" })
    } catch (error) {
        res.status(400).json({ message: "error occured" })
        console.log(error);
    }
}
