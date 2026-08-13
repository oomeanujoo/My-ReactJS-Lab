// Scheme detail page: shows scheme info, and lets the client either start a
// SIP (Systematic Investment Plan — a fixed amount auto-debited on a
// recurring date) or invest a one-time Lumpsum.
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import mfSchemes from "./mfData";
import { useMf } from "./mfContext";
import { useAuth } from "../../Auth/authContext";

const MfSchemeDetail = () => {
  const { id } = useParams();
  const { subscribe } = useMf();
  // Same rule as FDs: an Asset Manager can look at every scheme (to explain
  // it to a client) but only a Client can actually subscribe.
  const { canTransact } = useAuth();
  const scheme = mfSchemes.find((mf) => mf.id === id);

  // "SIP" or "Lumpsum" — which form is showing.
  const [planType, setPlanType] = useState("SIP");
  const [amount, setAmount] = useState(scheme ? scheme.minSip : 0);
  const [frequency, setFrequency] = useState("Monthly");
  const [sipDay, setSipDay] = useState(5);
  const [submitted, setSubmitted] = useState(null);

  if (!scheme) {
    return (
      <div className="p-4">
        <p className="text-red-600">Scheme not found.</p>
        <Link to="/assets/mf" className="text-blue-600 hover:underline">
          Back to Mutual Funds
        </Link>
      </div>
    );
  }

  function switchPlanType(nextType) {
    setPlanType(nextType);
    setAmount(nextType === "SIP" ? scheme.minSip : scheme.minLumpsum);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subscription = subscribe({
      schemeId: scheme.id,
      schemeName: scheme.name,
      planType,
      amount: Number(amount),
      frequency: planType === "SIP" ? frequency : null,
      sipDay: planType === "SIP" ? Number(sipDay) : null,
      oneYearReturn: scheme.oneYearReturn,
    });
    setSubmitted(subscription);
  }

  if (submitted) {
    return (
      <div className="p-4 max-w-lg">
        <div className="bg-green-50 border border-green-300 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-green-800">
            {submitted.planType} started successfully
          </h2>
          <p className="text-sm text-gray-700 mt-2">
            {submitted.subscriptionId}
          </p>
          <p className="text-sm text-gray-700">
            ₹{submitted.amount.toLocaleString("en-IN")}
            {submitted.planType === "SIP"
              ? ` ${submitted.frequency}, debited on day ${submitted.sipDay} of the month`
              : " one-time"}{" "}
            in {submitted.schemeName}
          </p>
          <Link
            to="/assets/mf/subscriptions"
            className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            View My Investments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-lg">
      <h2 className="text-xl font-semibold">{scheme.name}</h2>
      <p className="text-sm text-gray-500">{scheme.category} · {scheme.risk} risk</p>

      <div className="grid grid-cols-3 gap-2 my-4 text-sm bg-white rounded-lg shadow p-4">
        <div>
          <p className="text-gray-500 text-xs">NAV</p>
          <p className="font-medium">₹{scheme.nav}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">1Y Return</p>
          <p className="font-medium text-green-600">{scheme.oneYearReturn}%</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">3Y Return</p>
          <p className="font-medium text-green-600">{scheme.threeYearReturn}%</p>
        </div>
      </div>

      {canTransact ? (
        <>
          {/* Plan type toggle — this is the "several subscription plans" part */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => switchPlanType("SIP")}
              className={`flex-1 py-2 rounded-md text-sm font-medium ${
                planType === "SIP" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border"
              }`}
            >
              Start SIP
            </button>
            <button
              type="button"
              onClick={() => switchPlanType("Lumpsum")}
              className={`flex-1 py-2 rounded-md text-sm font-medium ${
                planType === "Lumpsum" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border"
              }`}
            >
              Invest Lumpsum
            </button>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount (min ₹
                {(planType === "SIP" ? scheme.minSip : scheme.minLumpsum).toLocaleString("en-IN")})
              </label>
              <input
                type="number"
                min={planType === "SIP" ? scheme.minSip : scheme.minLumpsum}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 w-full border rounded-md p-2"
                required
              />
            </div>

            {planType === "SIP" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="mt-1 w-full border rounded-md p-2"
                  >
                    <option>Monthly</option>
                    <option>Quarterly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    SIP Date (day of month)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={28}
                    value={sipDay}
                    onChange={(e) => setSipDay(e.target.value)}
                    className="mt-1 w-full border rounded-md p-2"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Confirm {planType === "SIP" ? "SIP" : "Investment"}
            </button>
          </form>
        </>
      ) : (
        // Defense in depth, same reasoning as fdInvestForm.js: this page is
        // reachable directly by URL, so the permission check has to live
        // here too, not just in whether a link to it is shown elsewhere.
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-800">
            View only — Asset Manager mode
          </h3>
          <p className="text-sm text-gray-700 mt-2">
            Use this page to walk a client through the scheme's NAV, category,
            risk, and returns. Only the Client can start a SIP or invest a
            lumpsum themselves.
          </p>
        </div>
      )}
    </div>
  );
};

export default MfSchemeDetail;
