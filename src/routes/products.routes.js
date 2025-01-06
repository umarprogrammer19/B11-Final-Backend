import express from "express";
import { addProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from "../controllers/product.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
import { authenticate } from "../middleware/userRef.middleware.js";


const router = express.Router();

router.post("/addProducts", authenticate, upload.single("image"), addProduct);
router.get("/products", getProducts);
router.get("/products/:id", getSingleProduct);
router.put("/updateProduct/:id", authenticate, upload.single("image"), updateProduct);
router.delete("/deleteProduct/:id", authenticate, deleteProduct);


export default router;