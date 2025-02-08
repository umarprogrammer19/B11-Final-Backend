import express from "express";
import { deleteUser, editUser, getAllUsers } from "../handlers/user.handlers.js";
import { authenticateAdmin } from "../middleware/admin.middleware.js";
const router = express.Router();

router.get("/users", authenticateAdmin, getAllUsers);
router.delete("/users/delete/:id", authenticateAdmin, deleteUser);
router.patch("/users/update/:id", authenticateAdmin, editUser);

export default router;