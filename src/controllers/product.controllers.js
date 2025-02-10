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
        await productsModels.create({ title, description, price, imageURL, userRef: req.user._id });
        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "An error occurred" });
    }
};

export const getProducts = async (req, res) => {
    try {
        // Get query parameters for pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        const skip = (page - 1) * limit;
        const products = await productsModels.find()
            .skip(skip)
            .limit(limit);

        const totalProducts = await productsModels.countDocuments();

        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
            products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getSingleProduct = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id is required" })
    try {
        const product = await productsModels.findById(id)
        res.status(200).json({ message: "Success", product })
    } catch (error) {
        console.log("code error", error);
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Product ID is required" });
    if (!req.user) return res.status(401).json({ message: "Login First" });

    try {
        let imageUrl;
        if (req.file) {
            imageUrl = await uploadImageToCloudinary(req.file.path);
            if (!imageUrl) return res.status(400).json({ message: "Image upload failed" });
        }

        const product = await productsModels.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const updatedFields = {
            title: req.body.title || product.title,
            description: req.body.description || product.description,
            price: req.body.price || product.price,
            stock: req.body.stock || product.stock,
            tags: req.body.tags ? req.body.tags.split(",") : product.tags, 
            discountPercentage: req.body.discountPercentage || product.discountPercentage,
            isNew: req.body.isNew !== undefined ? req.body.isNew : product.isNew, 
            category: req.body.category || product.category,
            imageUrl: imageUrl || product.imageUrl,
        };

        Object.assign(product, updatedFields);
        await product.save();

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "An error occurred while updating the product" });
    }
};


export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "id is required" });
    // Check if the logged-in user is the owner of the product
    if (!req.user) return res.status(401).json({ message: "Login First" });

    try {
        const isProduct = await productsModels.findById(id);
        console.log(isProduct);

        if (!isProduct) return res.status(404).json({ message: "Product not found" });

        // if (isProduct.userRef.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ message: "You are not authorized to delete this product" });
        // }

        const product = await productsModels.findByIdAndDelete(id);

        res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "An error occurred" });
    }
};