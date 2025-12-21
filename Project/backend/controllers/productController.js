import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProducts = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            subcategory,
            price,
            sizes,
            bestseller
        } = req.body;

        // Debug: check what Multer received
        console.log("Req.files received:", req.files);

        // If no files at all
        if (!req.files) {
            return res.status(400).json({
                success: false,
                message: "No files detected."
            });
        }

        // Safely extract up to 4 images
        const images = [
            req.files.image1?.[0],
            req.files.image2?.[0],
            req.files.image3?.[0],
            req.files.image4?.[0],
        ].filter(Boolean);

        // If files exist but keys are wrong
        if (images.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid image fields found (image1, image2, image3, image4)"
            });
        }

        // Upload images to Cloudinary
        const imagesUrl = await Promise.all(
            images.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "products",
                    resource_type: "image",
                });
                return result.secure_url;
            })
        );

        // Build product object
        const productData = {
            name,
            description,
            category,
            subcategory,
            price: Number(price),
            bestseller: bestseller === "true",
            sizes: Array.isArray(sizes) ? sizes : JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now(),
        };

        // Save to MongoDB
        const product = new productModel(productData);
        await product.save();

        // Success response
        res.status(201).json({
            success: true,
            message: "Product uploaded and saved successfully",
            product,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const removeProducts = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const singleProducts = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export { addProducts, listProducts, removeProducts, singleProducts }