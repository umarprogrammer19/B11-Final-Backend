import express from "express";
import { getAllUsers } from "../handlers/user.handlers.js";
import { authenticateAdmin } from "../middleware/admin.middleware.js";
const router = express.Router();

router.get("/users", authenticateAdmin, getAllUsers);

export default router;