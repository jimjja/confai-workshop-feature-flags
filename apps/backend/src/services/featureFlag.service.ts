import { FeatureFlag, prisma } from "../database/client";
import type { CreateFeatureFlagInput } from "../validators/featureFlag.validator";

export async function createFeatureFlagService(
  input: CreateFeatureFlagInput,
): Promise<FeatureFlag> {
  return prisma.featureFlag.create({
    data: {
      name: input.name,
      description: input.description,
      enabled: input.enabled,
    },
  });
}

export async function listFeatureFlagsService(): Promise<FeatureFlag[]> {
  return prisma.featureFlag.findMany({
    orderBy: { createdAt: "desc" },
  });
}
