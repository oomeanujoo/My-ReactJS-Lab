// Browse all FD schemes, tick a few to compare, or jump straight to invest.
import { Link } from "react-router-dom";
import fdSchemes from "./fdData";
import { useFd } from "./fdContext";
import { useAuth } from "../../Auth/authContext";

const FdList = () => {
  const { compareIds, toggleCompare } = useFd();
  // canTransact is false for an Asset Manager — they can browse and
  // compare (useful for explaining schemes to a client) but the "Invest"
  // action itself is Client-only.
  const { canTransact } = useAuth();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Fixed Deposit Schemes</h2>
        {!canTransact && (
          <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
            View only — Asset Manager mode
          </span>
        )}
        {/* Only show the "Compare" call-to-action once 2+ schemes are ticked */}
        {compareIds.length >= 2 && (
          <Link
            to="/assets/fd/compare"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            Compare {compareIds.length} selected
          </Link>
        )}
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-3">Compare</th>
              <th className="p-3">Issuer</th>
              <th className="p-3">Type</th>
              <th className="p-3">Rate (p.a.)</th>
              <th className="p-3">Senior Citizen Rate</th>
              <th className="p-3">Tenure</th>
              <th className="p-3">Min Amount</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {fdSchemes.map((fd) => (
              <tr key={fd.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={compareIds.includes(fd.id)}
                    onChange={() => toggleCompare(fd.id)}
                  />
                </td>
                <td className="p-3 font-medium">{fd.issuer}</td>
                <td className="p-3">{fd.type}</td>
                <td className="p-3">{fd.interestRate}%</td>
                <td className="p-3">{fd.seniorCitizenRate}%</td>
                <td className="p-3">
                  {fd.minTenureMonths}-{fd.maxTenureMonths} months
                </td>
                <td className="p-3">₹{fd.minAmount.toLocaleString("en-IN")}</td>
                <td className="p-3">
                  {canTransact ? (
                    <Link
                      to={`/assets/fd/invest/${fd.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Invest
                    </Link>
                  ) : (
                    <span className="text-gray-400 text-xs">Client only</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FdList;
