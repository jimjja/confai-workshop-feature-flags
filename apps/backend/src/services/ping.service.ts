import { prisma } from "../database/client";

/**
 * Checks the database connection by running a simple query.
 * Throws if the connection is not healthy.
 */
export async function checkDbHealth(): Promise<boolean> {
  try {
    // Use a lightweight query to check DB connectivity
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    throw new Error(
      `Database connection failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
