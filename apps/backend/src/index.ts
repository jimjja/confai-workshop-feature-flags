import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import { logger } from "./lib/logger";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import routes from "./routes";

dotenv.config();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4000;
const app: Express = express();

// Request logger middleware
app.use(loggerMiddleware);

// Register CORS middleware
app.use(
  cors({
    origin: (process.env.CORS_ALLOWED_ORIGINS || "").split(";"),
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Register JSON body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

// Routes
app.use("/api", routes);

// 404 handler for unmatched routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Server listening at http://0.0.0.0:${PORT}`);
});

// Add error handlers for uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  logger.error("Unhandled Rejection:", error);
  process.exit(1);
});

export { app };
