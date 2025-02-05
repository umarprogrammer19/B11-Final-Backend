import express from "express";
import { getContactForm } from "../controllers/contact.controllers.js";

const router = express.Router();

router.post("/contact", getContactForm);

export default router;