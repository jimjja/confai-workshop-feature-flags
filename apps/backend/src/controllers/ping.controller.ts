import { Request, Response } from "express";
import { checkDbHealth } from "../services/ping.service";

/**
 * Controller for the /ping endpoint.
 * Returns a simple pong message for health checks.
 */
export function getPing(req: Request, res: Response): void {
  res.json({ message: "pong" });
}

/**
 * Controller for the /ping/db endpoint.
 * Checks database connectivity and returns status.
 */
export async function getDbHealth(req: Request, res: Response): Promise<void> {
  try {
    await checkDbHealth();
    res.status(200).json({ db: "healthy" });
  } catch (error) {
    res.status(500).json({
      db: "unhealthy",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
