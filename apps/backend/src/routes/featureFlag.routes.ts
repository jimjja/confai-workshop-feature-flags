import { Router } from "express";
import {
  createFeatureFlagController,
  listFeatureFlagsController,
} from "../controllers/featureFlag.controller";

const router = Router();

router.post("/", async (req, res) => {
  await createFeatureFlagController(req, res);
});

router.get("/", async (req, res) => {
  await listFeatureFlagsController(req, res);
});

export default router;
