import express from "express";
import { signIn, signUp } from "../controllers/users.controllers.js";
import { authenticateUser } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/signup", signUp);
router.post("/login", signIn);
router.get("/verifyUser", authenticateUser, (req, res) => {
    res.json({ message: "Hey! You Are Logged In", user: req.user });
});

export default router;