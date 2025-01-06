import express from "express";
import { addProduct } from "../controllers/product.controllers.js";
import { upload } from "../middleware/multer.middleware.js"


const router = express.Router();

router.post("/addProducts", upload.single("image"), addProduct)

export default router;