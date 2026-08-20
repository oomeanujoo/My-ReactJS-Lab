// Concept: calling APIs the industry-standard way (see LEARNING_NOTES.md).
// A shared axios "instance" — set config (base URL, timeout, headers) ONCE
// here, instead of repeating it on every single API call in the app.
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // a free public test API
  timeout: 5000,
});

// An "interceptor" — code that runs automatically on every request/response
// that goes through this instance. Real apps use this to attach an auth
// token to every call, or to handle errors (like a 401) in one place
// instead of repeating that logic at every call site.
apiClient.interceptors.request.use((config) => {
  // In a real app: config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
