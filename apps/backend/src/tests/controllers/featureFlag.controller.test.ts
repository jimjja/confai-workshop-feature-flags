import { createFeatureFlagController } from "../../controllers/featureFlag.controller";
import * as service from "../../services/featureFlag.service";

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("createFeatureFlagController", () => {
  const validBody = {
    name: "test-flag",
    description: "A test flag",
    enabled: true,
  };

  it("should return 201 and created flag on success", async () => {
    const req: any = { body: validBody };
    const res = mockResponse();
    jest.spyOn(service, "createFeatureFlagService").mockResolvedValueOnce({
      ...validBody,
      id: "uuid",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await createFeatureFlagController(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(validBody));
  });

  it("should return 400 on validation error", async () => {
    const req: any = { body: { ...validBody, name: "" } };
    const res = mockResponse();
    await createFeatureFlagController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Validation failed" }),
    );
  });

  it("should return 500 on other errors", async () => {
    const req: any = { body: validBody };
    const res = mockResponse();
    jest
      .spyOn(service, "createFeatureFlagService")
      .mockRejectedValueOnce(new Error("Unexpected"));
    await createFeatureFlagController(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});
