import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const startTime = new Date().getTime();

  // Log request
  logger.info(`Incoming ${req.method} request to ${req.url}`, {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  // Log response
  res.on("finish", () => {
    const duration = new Date().getTime() - startTime;
    const logLevel = res.statusCode >= 400 ? "error" : "info";

    logger[logLevel](
      `${req.method} ${req.url} ${res.statusCode} - ${duration}ms`,
      {
        method: req.method,
        url: req.url,
        status: res.statusCode,
        duration,
      },
    );
  });

  next();
};
