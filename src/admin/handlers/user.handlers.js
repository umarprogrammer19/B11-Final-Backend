import usersModels from "../../models/users.models.js";

export const getAllUsers = async (req, res) => {
    if (!req.user) return res.status(400).json({ message: "Please Login First" });
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        const users = await usersModels.find()
            .skip(skip)
            .limit(limit);

        const totalUsers = await usersModels.countDocuments();
        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers,
            users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

