const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function fetchBiographies(
  page: number,
  limit: number,
  search: string,
  category: string,
) {
  const skip = (page - 1) * limit;
  const params = new URLSearchParams({
    skip: skip.toString(),
    limit: limit.toString(),
  });

  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const res = await fetch(`${BASE_URL}/biographies?${params}`);
  if (!res.ok) throw new Error("Failed to fetch biographies");
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/biographies/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
