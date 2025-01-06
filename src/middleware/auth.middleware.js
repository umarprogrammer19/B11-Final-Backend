import jwt from "jsonwebtoken";

export const authenticateUser = (req, res) => {
    try {
        const refreshJwtToken = req.cookies.refreshToken;

        if (!refreshJwtToken) return res.status(401).json({ message: "Please log in to access this page." });

        const user = jwt.verify(refreshJwtToken, process.env.REFRESH_JWT_SECRET);

        const newAccessToken = jwt.sign(
            {email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "6h" }
        );

        res.status(200).json({
            message: "User verified successfully.",
            user,
            accessToken: newAccessToken,
        });
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Your session has expired. Please log in again." });
        }
        if (err.name === "JsonWebTokenError") {
            return res.status(403).json({ message: "Invalid refresh token." });
        }

        console.log("Error in authenticateUser middleware:", err);
        res.status(500).json({ message: "An internal server error occurred." });
    }
};