import express from "express";
import { deleteUser, getAllUsers } from "../handlers/user.handlers.js";
import { authenticateAdmin } from "../middleware/admin.middleware.js";
const router = express.Router();

router.get("/users", authenticateAdmin, getAllUsers);
router.delete("/users/delete/:id", authenticateAdmin, deleteUser);

export default router;