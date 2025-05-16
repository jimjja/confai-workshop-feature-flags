import { prisma } from "../../database/client";
import { createFeatureFlagService } from "../../services/featureFlag.service";

jest.mock("../../database/client", () => ({
  prisma: {
    featureFlag: {
      create: jest.fn(),
    },
  },
}));

describe("createFeatureFlagService", () => {
  const input = {
    name: "test-flag",
    description: "A test flag",
    enabled: true,
  };

  it("should create a feature flag successfully", async () => {
    const mockFlag = {
      ...input,
      id: "uuid",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    (prisma.featureFlag.create as jest.Mock).mockResolvedValueOnce(mockFlag);
    const result = await createFeatureFlagService(input);
    expect(result).toEqual(mockFlag);
    expect(prisma.featureFlag.create).toHaveBeenCalledWith({ data: input });
  });

  it("should throw on unique constraint error", async () => {
    const error = { code: "P2002" };
    (prisma.featureFlag.create as jest.Mock).mockRejectedValueOnce(error);
    await expect(createFeatureFlagService(input)).rejects.toEqual(error);
  });
});
