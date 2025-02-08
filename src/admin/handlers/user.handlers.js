import mongoose from "mongoose";
import usersModels from "../../models/users.models.js";
import bcrypt from "bcrypt";

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

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id is Missing" });
    if (!req.user) return res.status(400).json({ message: "Please Login First" });
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "Invalid Id" });

    try {
        const isUser = usersModels.findById(id);
        if (!isUser) res.status(404).json({ message: "User Not Found" });

        const user = await usersModels.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully", user });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "An error occurred" });
    }
}

export const editUser = async (req, res) => {
    const { id } = req.params;
    const { fullname, email, password } = req.body;

    if (!fullname && !email && !password) {
        return res.status(400).json({ message: "Please Enter Atleast One Field" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid ID" });
    }

    if (!req.user) {
        return res.status(401).json({ message: "Please Login First" });
    }

    try {
        const user = await usersModels.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        let updatedPassword = password;
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await usersModels.findByIdAndUpdate(id, {
            fullname: fullname || user.fullname,
            email: email || user.email,
            password: updatedPassword || user.password
        }, { new: true });

        return res.status(200).json({ message: "User updated successfully", user: updatedUser });

    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ message: "An error occurred while updating the user", error: error.message });
    }
};
