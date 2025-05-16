/**
 * Feature flag types supported in the system.
 */
export type FeatureFlagType = "boolean" | "percentage" | "multivariate";

/**
 * Base type for a feature flag entity.
 */
export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  type: FeatureFlagType;
  /**
   * For percentage: 0-100, for multivariate: array of options, for boolean: undefined
   */
  value: boolean | number | MultivariateValue[] | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Multivariate flag value option.
 */
export interface MultivariateValue {
  key: string;
  value: string;
  percentage: number; // 0-100
}

/**
 * Input for creating a feature flag.
 */
export interface CreateFeatureFlagInput {
  name: string;
  description: string;
  enabled: boolean;
  type: FeatureFlagType;
  value?: boolean | number | MultivariateValue[];
}
