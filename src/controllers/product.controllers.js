import dotenv from "dotenv";
import productsModels from "../models/products.models.js";
import { uploadImageToCloudinary } from "../utils/cloudinary.js";
dotenv.config();

export const addProduct = async (req, res) => {
    const { title, description, price } = req.body;

    // Validate the input
    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!description) return res.status(400).json({ message: "Description is required" });
    if (!price) return res.status(400).json({ message: "Price is required" });
    if (!req.file) return res.status(400).json({ message: "Please upload an image" });
    if (!req.user) return res.status(401).json({ message: "Login First" });
    try {
        const imageURL = await uploadImageToCloudinary(req.file.path);
        if (!imageURL) {
            return res.status(500).json({ message: "Error uploading the image" });
        }
        await productsModels.create({ title, description, price, imageURL });
        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "An error occurred" });
    }
};
