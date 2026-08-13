// MfContext = shared state for Mutual Fund subscriptions (SIP + lumpsum),
// same pattern as FdContext — see fdContext.js for the more heavily
// commented version of this pattern.
import { createContext, useContext, useState, useEffect } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const STORAGE_KEY = "asset-mgmt.my-mf-subscriptions";

const MfContext = createContext(undefined);

export function useMf() {
  const context = useContext(MfContext);
  if (!context) throw new Error("useMf must be used within an MfProvider");
  return context;
}

export function MfProvider({ children }) {
  const [subscriptions, setSubscriptions] = useState(() =>
    loadFromStorage(STORAGE_KEY, [])
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEY, subscriptions);
  }, [subscriptions]);

  // subscription = { schemeId, schemeName, planType: "SIP" | "Lumpsum",
  //                  amount, frequency, sipDay, oneYearReturn }
  function subscribe(subscription) {
    const newSubscription = {
      ...subscription,
      subscriptionId: `INV-MF-${Date.now()}`,
      startDate: new Date().toISOString(),
      status: "Active",
      payments: [], // "submit timely payments" — see recordPayment below
    };
    setSubscriptions((prev) => [...prev, newSubscription]);
    return newSubscription;
  }

  // Cancelling a SIP/Lumpsum plan — a Client-only action (see mfSubscriptions.js).
  function cancelSubscription(subscriptionId) {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.subscriptionId === subscriptionId ? { ...sub, status: "Cancelled" } : sub
      )
    );
  }

  // "Submit a timely payment" — records one SIP installment being paid.
  // Only makes sense for an Active SIP; a Lumpsum is already paid in full
  // up front, and a Cancelled plan shouldn't take new payments.
  function recordPayment(subscriptionId) {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.subscriptionId === subscriptionId
          ? { ...sub, payments: [...(sub.payments ?? []), { paidOn: new Date().toISOString(), amount: sub.amount }] }
          : sub
      )
    );
  }

  const value = { subscriptions, subscribe, cancelSubscription, recordPayment };

  return <MfContext.Provider value={value}>{children}</MfContext.Provider>;
}
