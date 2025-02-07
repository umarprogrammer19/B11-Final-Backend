import express from "express";
import { adminLogin } from "../handlers/auth.handlers.js";
const router = express.Router();

router.post("/login", adminLogin);

export default router;