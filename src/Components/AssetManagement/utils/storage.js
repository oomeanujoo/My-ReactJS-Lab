// Tiny wrapper around the browser's localStorage Web API.
// Concept notes: LEARNING_NOTES.md > "localStorage — fake persistence for a demo app"
//
// Why wrap it instead of calling localStorage.getItem/setItem everywhere?
// 1. localStorage only stores strings -> we always JSON.stringify/parse here,
//    so the rest of the app just deals with normal JS objects/arrays.
// 2. If localStorage is unavailable (e.g. private browsing in some old
//    browsers) or the saved JSON is corrupted, JSON.parse throws — we catch
//    that once, here, instead of wrapping every call site in try/catch.

export function loadFromStorage(key, fallbackValue) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallbackValue;
  } catch (err) {
    console.warn(`Could not read "${key}" from localStorage, using fallback.`, err);
    return fallbackValue;
  }
}

export function saveToStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Could not save "${key}" to localStorage.`, err);
  }
}
