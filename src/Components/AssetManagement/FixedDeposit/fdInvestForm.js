// The "client self-buys an FD" flow: pick amount + tenure + payout, see the
// maturity value update live, then confirm.
import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import fdSchemes, { estimateMaturityValue } from "./fdData";
import { useFd } from "./fdContext";
import { useAuth } from "../../Auth/authContext";

const FdInvestForm = () => {
  // useParams reads the ":id" part of the URL (e.g. /assets/fd/invest/fd-hdfc-1)
  const { id } = useParams();
  const { buyFd, draftInvestments, updateDraftInvestment } = useFd();
  const { canTransact } = useAuth();

  const scheme = fdSchemes.find((fd) => fd.id === id);

  // Concept: lifting state up (see LEARNING_NOTES.md and fdContext.js).
  // These values are NOT local useState — they live in FdContext instead,
  // which is why leaving this page (e.g. "Back to FD list") and coming
  // back to invest in the SAME scheme shows whatever you'd already typed,
  // instead of resetting to blank. `draft` falls back to the scheme's
  // defaults only the very first time this scheme's form is opened.
  const draft = scheme ? draftInvestments[scheme.id] : undefined;
  const amount = draft?.amount ?? (scheme ? scheme.minAmount : 0);
  const tenureMonths = draft?.tenureMonths ?? (scheme ? scheme.minTenureMonths : 12);
  const payoutOption = draft?.payoutOption ?? (scheme ? scheme.payoutOptions[0] : "");
  const nomineeName = draft?.nomineeName ?? "";

  const [submitted, setSubmitted] = useState(null);

  function setAmount(value) {
    updateDraftInvestment(scheme.id, { amount: value });
  }
  function setTenureMonths(value) {
    updateDraftInvestment(scheme.id, { tenureMonths: value });
  }
  function setPayoutOption(value) {
    updateDraftInvestment(scheme.id, { payoutOption: value });
  }
  function setNomineeName(value) {
    updateDraftInvestment(scheme.id, { nomineeName: value });
  }

  // useMemo = "only recalculate this when its dependencies change."
  // Without it, this same math would still run on every render (cheap here,
  // but this is the pattern you reach for once a calculation gets
  // expensive — e.g. looping over thousands of rows).
  const maturityValue = useMemo(() => {
    if (!scheme) return 0;
    return estimateMaturityValue(Number(amount) || 0, scheme.interestRate, tenureMonths);
  }, [scheme, amount, tenureMonths]);

  if (!scheme) {
    return (
      <div className="p-4">
        <p className="text-red-600">Scheme not found.</p>
        <Link to="/assets/fd" className="text-blue-600 hover:underline">
          Back to FD list
        </Link>
      </div>
    );
  }

  // Defense in depth: the FD list already hides the "Invest" link for an
  // Asset Manager, but this page is still reachable by typing the URL
  // directly — so the actual permission check has to live here too, not
  // just in what links get shown.
  if (!canTransact) {
    return (
      <div className="p-4 max-w-lg">
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-800">
            View only — Asset Manager mode
          </h2>
          <p className="text-sm text-gray-700 mt-2">
            Asset Managers can view and explain FD schemes to a client, but
            only the Client themselves can book one.
          </p>
          <Link
            to="/assets/fd"
            className="inline-block mt-4 text-blue-600 hover:underline text-sm"
          >
            Back to FD list
          </Link>
        </div>
      </div>
    );
  }

  function handleSubmit(e) {
    // preventDefault stops the browser's default "submit = reload the page"
    // behaviour — a plain-JS DOM event method, not something React invented.
    e.preventDefault();

    const purchase = buyFd({
      schemeId: scheme.id,
      issuer: scheme.issuer,
      principal: Number(amount),
      tenureMonths: Number(tenureMonths),
      payoutOption,
      interestRate: scheme.interestRate,
      maturityValue,
      nomineeName,
    });

    setSubmitted(purchase);
  }

  if (submitted) {
    return (
      <div className="p-4 max-w-lg">
        <div className="bg-green-50 border border-green-300 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-green-800">
            FD booked successfully
          </h2>
          <p className="text-sm text-gray-700 mt-2">
            Investment ID: <b>{submitted.investmentId}</b>
          </p>
          <p className="text-sm text-gray-700">
            ₹{submitted.principal.toLocaleString("en-IN")} with {submitted.issuer} for{" "}
            {submitted.tenureMonths} months — maturity value ≈ ₹
            {submitted.maturityValue.toLocaleString("en-IN")}
          </p>
          <Link
            to="/assets/fd/my"
            className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            View My FDs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Invest in {scheme.issuer}</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount (min ₹{scheme.minAmount.toLocaleString("en-IN")})
          </label>
          <input
            type="number"
            min={scheme.minAmount}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tenure: {tenureMonths} months
          </label>
          <input
            type="range"
            min={scheme.minTenureMonths}
            max={scheme.maxTenureMonths}
            value={tenureMonths}
            onChange={(e) => setTenureMonths(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payout Option
          </label>
          <select
            value={payoutOption}
            onChange={(e) => setPayoutOption(e.target.value)}
            className="mt-1 w-full border rounded-md p-2"
          >
            {scheme.payoutOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nominee Name
          </label>
          <input
            type="text"
            value={nomineeName}
            onChange={(e) => setNomineeName(e.target.value)}
            className="mt-1 w-full border rounded-md p-2"
            placeholder="Optional"
          />
        </div>

        <div className="bg-gray-50 rounded-md p-3 text-sm">
          Estimated maturity value:{" "}
          <span className="font-semibold">
            ₹{maturityValue.toLocaleString("en-IN")}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Confirm & Book FD
        </button>
      </form>
    </div>
  );
};

export default FdInvestForm;
