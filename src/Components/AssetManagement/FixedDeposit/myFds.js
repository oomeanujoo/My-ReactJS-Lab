// "My FDs" — everything this client has self-bought, read straight out of
// FdContext (which is backed by localStorage, so it survives a page refresh).
import { Link } from "react-router-dom";
import { useFd } from "./fdContext";
import { useAuth } from "../../Auth/authContext";

const MyFds = () => {
  const { myFds, revokeFd } = useFd();
  // Revoking (closing an FD before maturity) is a Client-only action —
  // an Asset Manager viewing this same list can see it, not touch it.
  const { canTransact } = useAuth();

  if (myFds.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-600">
          You haven't booked any FDs yet.{" "}
          <Link to="/assets/fd" className="text-blue-600 hover:underline">
            Browse schemes
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My FDs</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {myFds.map((fd) => (
          <div key={fd.investmentId} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{fd.issuer}</h3>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  fd.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {fd.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{fd.investmentId}</p>
            <div className="mt-3 text-sm space-y-1">
              <p>Principal: ₹{fd.principal.toLocaleString("en-IN")}</p>
              <p>Tenure: {fd.tenureMonths} months</p>
              <p>Rate: {fd.interestRate}% p.a.</p>
              <p>Payout: {fd.payoutOption}</p>
              <p className="font-medium">
                Maturity value: ₹{fd.maturityValue.toLocaleString("en-IN")}
              </p>
            </div>
            {canTransact && fd.status === "Active" && (
              <button
                onClick={() => revokeFd(fd.investmentId)}
                className="mt-3 text-xs text-red-600 hover:underline"
              >
                Close FD prematurely
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFds;
