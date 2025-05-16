import { Router } from "express";
import featureFlagRoutes from "./featureFlag.routes";
import pingRoutes from "./ping.routes";

const router = Router();

router.use("/ping", pingRoutes);
router.use("/feature-flags", featureFlagRoutes);

export default router;
