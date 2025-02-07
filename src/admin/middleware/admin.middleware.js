import jwt from "jsonwebtoken";
import userModels from "../../models/users.models.js";

export const authenticateAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
        const user = await userModels.findOne({ email: decoded.email });

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        if (user.role !== 'admin') return res.status(401).json({ message: "Only Admin Can Access" });

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
