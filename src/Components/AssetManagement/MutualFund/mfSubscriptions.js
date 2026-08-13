// "My Investments" dashboard — every active SIP/Lumpsum, plus a couple of
// values we deliberately do NOT store, only calculate on the fly:
// "current estimated value" and "next SIP date". Storing values you can
// derive from other state is a classic React anti-pattern — it just gives
// you more places for the UI to go out of sync with reality.
import { Link } from "react-router-dom";
import { useMf } from "./mfContext";
import { estimateCurrentValue } from "./mfData";
import { useAuth } from "../../Auth/authContext";

// Plain JS Date math: given "debit on day N of the month", find the next
// occurrence of that day from today.
function getNextSipDate(sipDay) {
  const today = new Date();
  let next = new Date(today.getFullYear(), today.getMonth(), sipDay);
  if (next < today) {
    next = new Date(today.getFullYear(), today.getMonth() + 1, sipDay);
  }
  return next.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

const MfSubscriptions = () => {
  const { subscriptions, cancelSubscription, recordPayment } = useMf();
  // Cancelling a plan and paying a SIP installment are both Client-only —
  // an Asset Manager sees the same dashboard, minus these two buttons.
  const { canTransact } = useAuth();

  if (subscriptions.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-600">
          No investments yet.{" "}
          <Link to="/assets/mf" className="text-blue-600 hover:underline">
            Browse schemes
          </Link>
        </p>
      </div>
    );
  }

  const totalInvested = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-1">My Investments</h2>
      <p className="text-sm text-gray-500 mb-4">
        Total committed: ₹{totalInvested.toLocaleString("en-IN")}
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {subscriptions.map((sub) => (
          <div key={sub.subscriptionId} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{sub.schemeName}</h3>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  sub.status === "Active"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {sub.planType} · {sub.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{sub.subscriptionId}</p>
            <div className="mt-3 text-sm space-y-1">
              <p>Amount: ₹{sub.amount.toLocaleString("en-IN")}{sub.planType === "SIP" ? ` / ${sub.frequency}` : ""}</p>
              {sub.planType === "SIP" && sub.status === "Active" && (
                <p>Next debit: {getNextSipDate(sub.sipDay)}</p>
              )}
              {sub.planType === "SIP" && (
                // `?? []` covers subscriptions saved before "payments" existed
                // on the data shape — old localStorage data won't have it.
                <p>Payments made: {(sub.payments ?? []).length}</p>
              )}
              <p className="font-medium">
                Estimated current value: ₹
                {estimateCurrentValue(sub.amount, sub.oneYearReturn).toLocaleString("en-IN")}
              </p>
            </div>

            {canTransact && sub.status === "Active" && (
              <div className="mt-3 flex gap-3">
                {sub.planType === "SIP" && (
                  <button
                    onClick={() => recordPayment(sub.subscriptionId)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Pay this month's SIP
                  </button>
                )}
                <button
                  onClick={() => cancelSubscription(sub.subscriptionId)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MfSubscriptions;
