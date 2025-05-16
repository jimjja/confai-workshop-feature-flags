import { getAllFeatureFlags } from "@/api/featureFlag";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FeatureFlag } from "@/types/featureFlag.types";

export default async function FeatureFlagsPage() {
  let featureFlags: FeatureFlag[] = [];
  let error: string | null = null;
  try {
    featureFlags = await getAllFeatureFlags();
  } catch (e: unknown) {
    if (e instanceof Error) error = e.message;
    else error = "Failed to load feature flags.";
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Feature Flags</h1>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {featureFlags.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-gray-500">
                  No feature flags found.
                </TableCell>
              </TableRow>
            ) : (
              featureFlags.map((flag) => (
                <TableRow key={flag.id}>
                  <TableCell>{flag.name}</TableCell>
                  <TableCell>
                    {flag.enabled ? (
                      <span className="text-green-600 font-semibold">
                        Enabled
                      </span>
                    ) : (
                      <span className="text-gray-400">Disabled</span>
                    )}
                  </TableCell>
                  <TableCell>{flag.description}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
