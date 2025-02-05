import contactModels from "../models/contact.models.js";
import { transporter } from "./users.controllers.js";

export const getContactForm = async (req, res) => {
    const { username, email, subject, message } = req.body;
    if (!username || !email || !subject || message) return res.status(400).json({ message: "All Feilds Are Required" });
    try {
        const res = await contactModels.create({
            username,
            email,
            subject,
            message
        });

        await transporter.sendMail({
            from: '"Umar Farooq 👻"',
            to: `${email}, ${process.env.EMAIL}`,
            subject: `Contact Application`,
            text: `Hello ${username} You Feedback Has Been Submitted Successfully`,
            html: `<br /> username: ${username} <br /> email: ${email} <br/> subject: ${subject} <br /> message: ${message}`,
        });

        res.status(201).json({ message: "Your Application Submitted Successfully", res });
    } catch (error) {
        res.status(400).json({ message: "Cannot Submit Contact Application" });
    }
}