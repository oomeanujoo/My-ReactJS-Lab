// Landing page for /assets — just quick links into each area, like a
// mini dashboard an asset manager or client would see first.
import { Link } from "react-router-dom";

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
    </div>
  );
};

export default AssetOverview;
