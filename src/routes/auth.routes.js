import express from "express";
import { signUp } from "../controllers/users.controllers.js";

const router = express.Router();

router.post("/signup", signUp)

export default router;