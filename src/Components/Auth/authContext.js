// AuthContext = who is logged in, and what role they have.
// This is a MOCK login — no password check, no backend call. The point of
// this file isn't "how do you build secure authentication," it's "how do
// you model role-based access control (RBAC) in React once you DO have a
// logged-in user." Full notes: LEARNING_NOTES.md, the Auth chapter.
import { createContext, useContext, useState } from "react";
import { loadFromStorage, saveToStorage } from "../AssetManagement/utils/storage";

const STORAGE_KEY = "asset-mgmt.current-user";

// The two roles this app knows about, and what each is allowed to do.
// Keeping this as one exported object (instead of scattering role checks
// as string comparisons everywhere) means if a permission rule changes,
// there's exactly one place to edit it.
export const ROLES = {
  ASSET_MANAGER: "AssetManager",
  CLIENT: "Client",
};

const AuthContext = createContext(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadFromStorage(STORAGE_KEY, null));

  function login({ username, role }) {
    const nextUser = { username, role };
    setUser(nextUser);
    saveToStorage(STORAGE_KEY, nextUser);
  }

  function logout() {
    setUser(null);
    saveToStorage(STORAGE_KEY, null);
  }

  // Derived booleans — calculated fresh from `user` every render, never
  // stored separately. See LEARNING_NOTES.md > "Derived state."
  const isAuthenticated = !!user;
  // Only a Client can transact (buy/cancel/pay). An Asset Manager can see
  // everything a Client can, but every "do something" button gets hidden
  // or disabled based on this one flag.
  const canTransact = user?.role === ROLES.CLIENT;

  const value = { user, isAuthenticated, canTransact, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
