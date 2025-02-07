import usersModels from "../../models/users.models.js";

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Please Fill All Feilds" });

        const user = await usersModels.findOne({ email });

        if (!user) return res.status(404).json({ message: "User Does Not Exists With This Email" });

        if (user.role == 'admin') {
            const isTruePassword = await bcrypt.compare(password, user.password);
            if (!isTruePassword) return res.status(400).json({ message: "Password Is Incorrect" });

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: '/'
            });

            res.status(200).json({
                message: "User Logged In Successfully",
                accessToken,
                user,
            });
        } else {
            res.status(200).json({
                message: "This email cannot registered as admin",
            });
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred during Login" });
    }
}