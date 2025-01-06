import express from "express";
import { signIn, signUp } from "../controllers/users.controllers.js";


const router = express.Router();

router.post("/signup", signUp)
router.post("/login", signIn)

export default router;