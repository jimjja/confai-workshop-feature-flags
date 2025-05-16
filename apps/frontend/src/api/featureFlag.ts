const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
import type {
  CreateFeatureFlagInput,
  FeatureFlag,
} from "@/types/featureFlag.types";

/**
 * Create a new feature flag via the backend API.
 */
export async function createFeatureFlag(
  input: CreateFeatureFlagInput,
): Promise<FeatureFlag> {
  const res = await fetch(`${API_URL}/feature-flags`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create feature flag");
  }
  return res.json();
}

/**
 * Fetch all feature flags from the backend API.
 */
export async function getAllFeatureFlags(): Promise<FeatureFlag[]> {
  const res = await fetch(`${API_URL}/feature-flags`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch feature flags");
  }
  return res.json();
}
