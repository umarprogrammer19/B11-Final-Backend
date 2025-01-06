import usersModels from "../models/users.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
};

// Login Api 
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.status(400).json({ message: "Email is Required" });
        if (!password) return res.status(400).json({ message: "Password is Required" });

        const user = await usersModels.findOne({ email });
        if (!user) return res.status(404).json({ message: "User Does Not Exists With This Email" });

        const isTruePassword = await bcrypt.compare(password, user.password);
        if (!isTruePassword) return res.status(400).json({ message: "Password Is Incorrect" });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: '/'
        });

        res.status(200).json({
            message: "User Logged In Successfully",
            accessToken,
            refreshToken,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred during Login" });
    }
}
