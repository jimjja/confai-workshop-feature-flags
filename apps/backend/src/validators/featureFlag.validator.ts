import { z } from "zod";

export const createFeatureFlagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z
    .string()
    .max(255, "Description must be at most 255 characters"),
  enabled: z.boolean(),
});

export type CreateFeatureFlagInput = z.infer<typeof createFeatureFlagSchema>;
