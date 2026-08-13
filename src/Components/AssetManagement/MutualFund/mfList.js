// Browse all Mutual Fund schemes, with a search box + category filter.
import { useState, useTransition, useMemo } from "react";
import { Link } from "react-router-dom";
import mfSchemes from "./mfData";

const MfList = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Concept: React Fiber / concurrent rendering (see LEARNING_NOTES.md).
  // Two separate state values for the same search box:
  // - searchInput: what's actually typed. Updated immediately, every
  //   keystroke, so the box itself never feels laggy.
  // - searchQuery: the value actually used to filter the list. Updated
  //   inside startTransition, marking it as low-priority — React can
  //   keep typing responsive even while this work is slow/pending.
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSearchChange(e) {
    const value = e.target.value;
    setSearchInput(value);
    startTransition(() => {
      setSearchQuery(value);
    });
  }

  // Plain JS Set — a quick way to get "unique values" from an array without
  // writing a manual dedupe loop.
  const categories = ["All", ...new Set(mfSchemes.map((mf) => mf.category))];

  const visibleSchemes = useMemo(() => {
    // Our real mock data is only 5 schemes — filtering it is instant
    // either way. This artificial delay simulates what a genuinely large,
    // slow-to-filter list would feel like, so the effect of startTransition
    // above is actually visible: try typing fast in the search box — it
    // stays responsive even though this part visibly lags behind.
    const start = performance.now();
    while (performance.now() - start < 200) {
      // intentionally busy-waiting — see comment above
    }

    return mfSchemes
      .filter((mf) => categoryFilter === "All" || mf.category === categoryFilter)
      .filter((mf) => mf.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [categoryFilter, searchQuery]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4 gap-3">
        <h2 className="text-xl font-semibold">Mutual Fund Schemes</h2>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search by name..."
            className="border rounded-md p-2 text-sm"
          />
          {isPending && (
            <span className="text-xs text-gray-400">updating…</span>
          )}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded-md p-2 text-sm"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibleSchemes.map((mf) => (
          <Link
            key={mf.id}
            to={`/assets/mf/scheme/${mf.id}`}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold">{mf.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{mf.category}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500 text-xs">NAV</p>
                <p className="font-medium">₹{mf.nav}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Risk</p>
                <p className="font-medium">{mf.risk}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">1Y Return</p>
                <p className="font-medium text-green-600">
                  {mf.oneYearReturn}%
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">3Y Return</p>
                <p className="font-medium text-green-600">
                  {mf.threeYearReturn}%
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MfList;
