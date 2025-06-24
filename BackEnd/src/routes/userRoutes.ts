import { Router } from "express";
import {
  createUser,
  getUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = Router();

// Create a new user
router.post("/users", createUser);

// Get all users
router.get("/users", getAllUsers);

// Get a user by email (placed before /users/:id to avoid conflicts)
router.get("/users/email/:email", getUserByEmail);

// Get a user by ID
router.get("/users/:id", getUser);

// Update a user by ID
router.put("/users/:id", updateUser);

// Delete a user by ID
router.delete("/users/:id", deleteUser);

export default router;
