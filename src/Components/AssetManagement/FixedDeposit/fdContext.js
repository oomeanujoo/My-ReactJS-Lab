// FdContext = the "single source of truth" for everything FD-related that
// needs to be shared across multiple pages (list, compare, invest, my FDs).
// Concept notes: LEARNING_NOTES.md > "Context API — sharing state without prop drilling"
import { createContext, useContext, useState, useEffect } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const STORAGE_KEY = "asset-mgmt.my-fds";

const FdContext = createContext(undefined);

// Custom hook so every component does `const { myFds, buyFd } = useFd();`
// instead of importing createContext/useContext everywhere. Throwing here
// if used outside the provider turns "forgot to wrap in <FdProvider>" into
// an obvious error message instead of a silent `undefined` bug later.
export function useFd() {
  const context = useContext(FdContext);
  if (!context) throw new Error("useFd must be used within an FdProvider");
  return context;
}

export function FdProvider({ children }) {
  // Selected FD ids for the "compare" screen — plain component state,
  // doesn't need to survive a page refresh.
  const [compareIds, setCompareIds] = useState([]);

  // Purchased FDs — this DOES need to survive a refresh, so we seed it from
  // localStorage on first render and write back on every change (below).
  const [myFds, setMyFds] = useState(() => loadFromStorage(STORAGE_KEY, []));

  // Concept: lifting state up so it survives a component unmounting (see
  // LEARNING_NOTES.md). FdInvestForm's own useState would reset every time
  // you navigate away and back, because the form component itself gets
  // destroyed and recreated. FdProvider, on the other hand, stays mounted
  // for as long as you're anywhere under /assets/fd/* — so keeping the
  // in-progress form values HERE instead means they survive the trip.
  // Keyed by scheme id, since a different scheme's form should start fresh.
  const [draftInvestments, setDraftInvestments] = useState({});

  function updateDraftInvestment(schemeId, values) {
    setDraftInvestments((prev) => ({
      ...prev,
      [schemeId]: { ...prev[schemeId], ...values },
    }));
  }

  // useEffect = "after React updates the screen, also run this side effect."
  // Here: whenever myFds changes, mirror it into localStorage.
  useEffect(() => {
    saveToStorage(STORAGE_KEY, myFds);
  }, [myFds]);

  function toggleCompare(fdId) {
    setCompareIds((prev) =>
      prev.includes(fdId) ? prev.filter((id) => id !== fdId) : [...prev, fdId]
    );
  }

  function buyFd(purchase) {
    // purchase = { schemeId, issuer, principal, tenureMonths, payoutOption,
    //              interestRate, maturityValue, nomineeName }
    const newFd = {
      ...purchase,
      investmentId: `INV-FD-${Date.now()}`,
      purchaseDate: new Date().toISOString(),
      status: "Active",
    };
    setMyFds((prev) => [...prev, newFd]);

    // Purchase is done — clear this scheme's draft so a future visit to
    // this same form starts fresh instead of showing the old submitted values.
    setDraftInvestments((prev) => {
      const next = { ...prev };
      delete next[purchase.schemeId];
      return next;
    });

    return newFd;
  }

  // "Premature withdrawal" in FD terms — closing the FD before its tenure
  // is up. Real banks apply a penalty rate here; we just flag the status
  // so the UI (and the Reports page) can show it. Only ever called from
  // the Client role — see myFds.js.
  function revokeFd(investmentId) {
    setMyFds((prev) =>
      prev.map((fd) =>
        fd.investmentId === investmentId ? { ...fd, status: "Closed Early" } : fd
      )
    );
  }

  const value = {
    compareIds,
    toggleCompare,
    myFds,
    buyFd,
    revokeFd,
    draftInvestments,
    updateDraftInvestment,
  };

  return <FdContext.Provider value={value}>{children}</FdContext.Provider>;
}
