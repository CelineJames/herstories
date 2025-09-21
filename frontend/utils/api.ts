// const isDev = process.env.NODE_ENV === "development";
const isDev = process.env.NODE_ENV === "development";
export const BASE_URL = isDev
  ? "http://127.0.0.1:8000"
  : "https://herstories-backend.onrender.com";
// export const BASE_URL = "https://herstories-backend.onrender.com";

export async function fetchBiographies(
  page: number,
  limit: number,
  search: string,
  category: string
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
  const res = await fetch(`${BASE_URL}/category`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

// const BASE_URL = "";

// export async function fetchBiographies(page = 1, pageSize = 12) {
//   const res = await fetch(
//     `${BASE_URL}/biography/?page=${page}&page_size=${pageSize}`
//   );
//   if (!res.ok) throw new Error("Failed to fetch biographies");
//   return res.json();
// }
