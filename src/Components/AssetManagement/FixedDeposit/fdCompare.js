// Side-by-side comparison of whichever FD schemes were ticked on the list
// page. This is the "compare UI" feature from the original company product.
import { Link } from "react-router-dom";
import fdSchemes from "./fdData";
import { useFd } from "./fdContext";

const FdCompare = () => {
  const { compareIds } = useFd();

  // Plain JS .filter(): pull out only the schemes whose id was ticked.
  const selected = fdSchemes.filter((fd) => compareIds.includes(fd.id));

  if (selected.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-600">
          Nothing selected yet.{" "}
          <Link to="/assets/fd" className="text-blue-600 hover:underline">
            Go back and tick a couple of FDs to compare.
          </Link>
        </p>
      </div>
    );
  }

  // Rows to render — each row is one attribute, each column one selected FD.
  // Keeping this as data (not hand-written JSX per row) means adding a new
  // comparison attribute later is a one-line change.
  const rows = [
    { label: "Type", get: (fd) => fd.type },
    { label: "Interest Rate (p.a.)", get: (fd) => `${fd.interestRate}%` },
    { label: "Senior Citizen Rate", get: (fd) => `${fd.seniorCitizenRate}%` },
    {
      label: "Tenure Range",
      get: (fd) => `${fd.minTenureMonths}-${fd.maxTenureMonths} months`,
    },
    {
      label: "Minimum Amount",
      get: (fd) => `₹${fd.minAmount.toLocaleString("en-IN")}`,
    },
    { label: "Payout Options", get: (fd) => fd.payoutOptions.join(", ") },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Compare FDs</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-3">Attribute</th>
              {selected.map((fd) => (
                <th key={fd.id} className="p-3">
                  {fd.issuer}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t">
                <td className="p-3 font-medium text-gray-700">{row.label}</td>
                {selected.map((fd) => (
                  <td key={fd.id} className="p-3">
                    {row.get(fd)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FdCompare;
