import express from "express";
import { getAllUsers } from "../handlers/user.handlers.js";
const router = express.Router();

router.post("/users", getAllUsers);

export default router;