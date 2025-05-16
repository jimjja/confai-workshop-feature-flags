import { Router } from "express";
import { getDbHealth, getPing } from "../controllers/ping.controller";

const router = Router();

/**
 * @openapi
 * /ping:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Pong response
 *         content:
 *           application/json:
 *             example:
 *               message: pong
 */
router.get("/", getPing);

/**
 * @openapi
 * /ping/db:
 *   get:
 *     summary: Database health check endpoint
 *     responses:
 *       200:
 *         description: Database is healthy
 *         content:
 *           application/json:
 *             example:
 *               db: healthy
 *       500:
 *         description: Database is unhealthy
 *         content:
 *           application/json:
 *             example:
 *               db: unhealthy
 *               error: Database connection failed
 */
router.get("/db", getDbHealth);

export default router;
