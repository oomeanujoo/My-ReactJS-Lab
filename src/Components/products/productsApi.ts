import { NewProductInput, Product } from "./productsTypes";

export async function getProduct(signal: AbortSignal): Promise<Product> {
  // Fetch returns a Promise; await pauses this function while the UI stays responsive.
  const response = await fetch("https://dummyjson.com/products/1", { signal });
  if (!response.ok) throw new Error("Could not load the product.");
  return response.json();
}

// dummyjson.com/products/add is a mock endpoint: it validates nothing and always
// echoes back a fake new id, which is enough to prove a real POST + error path.
export async function addProduct(input: NewProductInput, signal: AbortSignal): Promise<Product> {
  const response = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: input.title,
      price: Number(input.price),
      discountPercentage: Number(input.discountPercentage || 0),
      stock: Number(input.stock),
    }),
    signal,
  });
  if (!response.ok) throw new Error("Could not save the product.");
  return response.json();
}
