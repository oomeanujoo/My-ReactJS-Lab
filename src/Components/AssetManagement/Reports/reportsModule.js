// Consolidated statement, modelled loosely on the real-world "CAMS
// Consolidated Account Statement" (CAS) — a single report showing all of a
// client's mutual fund + other holdings across providers. Real CAS reports
// come from CAMS/KFintech (the Registrar & Transfer Agents that maintain
// mutual fund unit-holder records for the AMCs). Here we just build the
// same *idea* — one combined table — from our own FD + MF context state.
import { useFd } from "../FixedDeposit/fdContext";
import { useMf } from "../MutualFund/mfContext";
import { estimateCurrentValue } from "../MutualFund/mfData";

// Turn a list of {label, value} rows into a downloadable CSV file.
// This is plain browser JS: Blob wraps raw data as a file-like object,
// URL.createObjectURL makes a temporary local URL pointing at it, and a
// throwaway <a download> element is how you trigger a save without a
// server ever being involved.
function downloadCsv(filename, rows) {
  const csvContent = rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const ReportsModule = () => {
  const { myFds } = useFd();
  const { subscriptions } = useMf();

  const fdTotal = myFds.reduce((sum, fd) => sum + fd.principal, 0);
  const mfTotal = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
  const mfCurrentValueTotal = subscriptions.reduce(
    (sum, sub) => sum + estimateCurrentValue(sub.amount, sub.oneYearReturn),
    0
  );

  function handleDownload() {
    const rows = [["Type", "Provider / Scheme", "Invested Amount", "Current / Maturity Value", "Status"]];
    myFds.forEach((fd) => {
      rows.push(["FD", fd.issuer, fd.principal, fd.maturityValue, fd.status]);
    });
    subscriptions.forEach((sub) => {
      rows.push([
        `MF (${sub.planType})`,
        sub.schemeName,
        sub.amount,
        estimateCurrentValue(sub.amount, sub.oneYearReturn),
        sub.status,
      ]);
    });
    downloadCsv("consolidated-statement.csv", rows);
  }

  const hasHoldings = myFds.length > 0 || subscriptions.length > 0;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Consolidated Statement</h2>
          <p className="text-sm text-gray-500">
            Combined view across FD and Mutual Fund holdings — modelled on a
            CAMS-style consolidated account statement.
          </p>
        </div>
        {hasHoldings && (
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            Download CSV
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-xs text-gray-500">FD Invested</p>
          <p className="text-lg font-semibold">₹{fdTotal.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-xs text-gray-500">MF Invested</p>
          <p className="text-lg font-semibold">₹{mfTotal.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-xs text-gray-500">Total Portfolio (est.)</p>
          <p className="text-lg font-semibold">
            ₹{(fdTotal + mfCurrentValueTotal).toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {!hasHoldings && (
        <p className="text-gray-600">
          No holdings yet — book an FD or start an MF subscription to see them here.
        </p>
      )}

      {myFds.length > 0 && (
        <>
          <h3 className="font-medium mb-2">Fixed Deposits</h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow mb-6">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="p-3">Issuer</th>
                  <th className="p-3">Principal</th>
                  <th className="p-3">Tenure</th>
                  <th className="p-3">Maturity Value</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {myFds.map((fd) => (
                  <tr key={fd.investmentId} className="border-t">
                    <td className="p-3">{fd.issuer}</td>
                    <td className="p-3">₹{fd.principal.toLocaleString("en-IN")}</td>
                    <td className="p-3">{fd.tenureMonths} months</td>
                    <td className="p-3">₹{fd.maturityValue.toLocaleString("en-IN")}</td>
                    <td className="p-3">{fd.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {subscriptions.length > 0 && (
        <>
          <h3 className="font-medium mb-2">Mutual Funds</h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="p-3">Scheme</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Invested</th>
                  <th className="p-3">Est. Current Value</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.subscriptionId} className="border-t">
                    <td className="p-3">{sub.schemeName}</td>
                    <td className="p-3">{sub.planType}</td>
                    <td className="p-3">₹{sub.amount.toLocaleString("en-IN")}</td>
                    <td className="p-3">
                      ₹{estimateCurrentValue(sub.amount, sub.oneYearReturn).toLocaleString("en-IN")}
                    </td>
                    <td className="p-3">{sub.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportsModule;
