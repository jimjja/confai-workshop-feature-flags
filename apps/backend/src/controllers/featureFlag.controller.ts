import { Request, Response } from "express";
import {
  createFeatureFlagService,
  listFeatureFlagsService,
} from "../services/featureFlag.service";
import { createFeatureFlagSchema } from "../validators/featureFlag.validator";

export async function createFeatureFlagController(req: Request, res: Response) {
  const parseResult = createFeatureFlagSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: parseResult.error.errors });
  }
  try {
    const featureFlag = await createFeatureFlagService(parseResult.data);
    return res.status(201).json(featureFlag);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "P2002") {
      // Prisma unique constraint violation
      return res
        .status(400)
        .json({ error: "Feature flag name must be unique." });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function listFeatureFlagsController(req: Request, res: Response) {
  try {
    const featureFlags = await listFeatureFlagsService();
    return res.status(200).json(featureFlags);
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
}
