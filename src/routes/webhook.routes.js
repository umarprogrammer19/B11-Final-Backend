import express from "express";
import { webhook } from "../controllers/furniro.controllers.js";

const router = express.Router();

router.post("/webhook", webhook);

export default router;