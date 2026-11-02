import apiClient from "../AssetManagement/utils/apiClient";

export interface ExchangeRate {
  base: string;
  quote: string;
  rate: number;
  date: string;
}

export interface IncomeUpdate {
  id: number;
  title: string;
  body: string;
}

// 1. `async` means this function returns a Promise for an ExchangeRate.
// Pattern 1: the browser's built-in fetch API. Frankfurter is a public,
// key-free exchange-rate API, useful here as a small real-world income reference.
export async function fetchUsdToInr(signal: AbortSignal): Promise<ExchangeRate> {
  // 2. Start the HTTP request now; `await` pauses only this function, not the UI.
  const response = await fetch("https://api.frankfurter.dev/v2/rate/usd/inr", {
    signal,
  });

  // 3. The response arrived; reject a non-success HTTP status explicitly.
  if (!response.ok) {
    throw new Error("Could not load the USD to INR reference rate.");
  }

  // 4. Parsing JSON is asynchronous too; its resolved object becomes the result.
  return response.json();
}

// 1. This service also returns a Promise, but Axios starts the request for us.
// Pattern 2: the shared Axios client. The component does not know its base URL,
// timeout, or how the HTTP request is configured.
export async function fetchIncomeUpdates(signal: AbortSignal): Promise<IncomeUpdate[]> {
  // 2. Wait for Axios without freezing the browser or the React screen.
  const response = await apiClient.get("/posts", {
    params: { _limit: 3 },
    signal,
  });

  // 3. Data has arrived. map() is synchronous: it reshapes each plain object now.
  return response.data.map((post: IncomeUpdate) => ({
    id: post.id,
    title: post.title,
    body: post.body,
  }));
}
