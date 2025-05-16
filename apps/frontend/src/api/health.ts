const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getHealth(): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/ping`);
  if (!res.ok) throw new Error("Failed to fetch health status");
  return res.json();
}
