import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal Server Error" });
};
