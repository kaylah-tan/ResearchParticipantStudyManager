import express, { Request, Response } from "express";
import cors from "cors";
import studyRoutes from "./routes/studyRoutes";
import userRoutes from "./routes/userRoutes";
import { notFoundHandler } from "./middleware/notFoundHandler";
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(requestLogger);

// Mount the API routes under /api
app.use("/api", studyRoutes);
app.use("/api", userRoutes);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Research Study Manager API");
});

// 404 handler for unmatched routes
app.use(notFoundHandler);

// Error handling middleware (must come after all other middleware/routes)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
