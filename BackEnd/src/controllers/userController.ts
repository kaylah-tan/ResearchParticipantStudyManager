import { Request, Response, NextFunction, RequestHandler } from "express";
import prisma from "../prismaClient";

// Create a new user
export const createUser: RequestHandler = async (req, res, next): Promise<void> => {
  const { email, name, password, role } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
        role,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    next(error);
  }
};

// Get a user by ID
export const getUser: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    next(error);
  }
};

// Get a user by email
export const getUserByEmail: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { email } = req.params;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    next(error);
  }
};

// Get all users
export const getAllUsers: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    next(error);
  }
};

// Update a user by ID
export const updateUser: RequestHandler = async (req, res, next): Promise<void> => {
  const { email, name, password, role } = req.body;
  try {
    const { id } = req.params;
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        email,
        name,
        password,
        role,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
};

// Delete a user by ID
export const deleteUser: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    next(error);
  }
};
