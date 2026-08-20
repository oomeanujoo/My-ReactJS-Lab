// Landing page for /assets — just quick links into each area, like a
// mini dashboard an asset manager or client would see first.
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "./utils/apiClient";

const cards = [
  {
    title: "Fixed Deposits",
    description: "Compare FD schemes across banks/NBFCs and self-book one.",
    to: "/assets/fd",
  },
  {
    title: "Mutual Funds",
    description: "Browse schemes, start a SIP or a lumpsum investment.",
    to: "/assets/mf",
  },
  {
    title: "Consolidated Statement",
    description: "CAMS-style combined report across FD + Mutual Fund holdings.",
    to: "/assets/reports",
  },
];

const AssetOverview = () => {
  // Concept: calling an API the industry-standard way (see LEARNING_NOTES.md).
  // Three pieces of state for one API call: the data, whether it's still
  // loading, and whether it failed — this loading/error/success trio is
  // the standard shape for any real network request.
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(null);

  useEffect(() => {
    // `cancelled` guards against calling setState after this component has
    // already unmounted (e.g. the user navigated away before the request
    // finished) — a real, common bug in API-calling code.
    let cancelled = false;

    async function fetchNews() {
      try {
        console.log("1. Starting API call (async — result arrives later)");
        const response = await apiClient.get("/posts", { params: { _limit: 3 } });
        console.log("3. API call finished, got data");
        if (!cancelled) {
          setNews(response.data);
          setNewsError(null);
        }
      } catch (err) {
        if (!cancelled) setNewsError("Could not load market updates.");
      } finally {
        if (!cancelled) setNewsLoading(false);
      }
    }

    fetchNews();
    console.log("2. This line runs BEFORE the API call finishes — fetchNews() didn't block");

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Asset Management</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold">{card.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{card.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-5">
        <h3 className="font-semibold mb-3">Market Updates</h3>
        {newsLoading && <p className="text-sm text-gray-500">Loading…</p>}
        {newsError && <p className="text-sm text-red-600">{newsError}</p>}
        {!newsLoading && !newsError && (
          <ul className="space-y-2">
            {news.map((item) => (
              <li key={item.id} className="text-sm text-gray-700 capitalize">
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AssetOverview;
