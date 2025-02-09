import axios from "axios";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectdb from "./src/db/index.js";
import Product from "./src/models/products.models.js";

dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MongoDB Connection
connectdb();

// Fetch Sanity API Data
const fetchSanityData = async () => {
    const sanityApiUrl =
        "https://ycb09v7u.api.sanity.io/v2025-01-18/data/query/production?query=*[_type == 'product']{title, 'imageUrl': imageUrl.asset->url, price, category, tags, description, dicountPercentage, isNew}";

    try {
        const response = await axios.get(sanityApiUrl);
        return response.data.result; 
    } catch (error) {
        console.error("Error fetching Sanity data:", error);
        return [];
    }
};

// Upload image to Cloudinary
const uploadToCloudinary = async (imageUrl) => {
    try {
        const uploadResponse = await cloudinary.v2.uploader.upload(imageUrl, {
            folder: "furniro_products", // Optional: Change folder name in Cloudinary
        });
        return uploadResponse.secure_url; // Return Cloudinary URL
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return null;
    }
};

// Process and Save Products
const processAndSaveProducts = async () => {
    const products = await fetchSanityData();

    for (const product of products) {
        console.log(`Uploading ${product.title} image...`);

        const cloudinaryUrl = await uploadToCloudinary(product.imageUrl);

        if (cloudinaryUrl) {
            const newProduct = new Product({
                title: product.title,
                description: product.description,
                imageUrl: cloudinaryUrl, // Use Cloudinary URL instead of Sanity URL
                price: product.price,
                category: product.category,
                tags: product.tags || [],
                discountPercentage: product.dicountPercentage || 0,
                isNew: product.isNew || false,
            });

            await newProduct.save();
            console.log(`✅ ${product.title} saved successfully.`);
        } else {
            console.log(`❌ Failed to upload image for ${product.title}.`);
        }
    }

    console.log("✅ All products have been processed and saved.");
    mongoose.connection.close();
};

// Run Migration
processAndSaveProducts();
