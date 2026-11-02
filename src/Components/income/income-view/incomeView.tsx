import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ExchangeRate,
  fetchIncomeUpdates,
  fetchUsdToInr,
  IncomeUpdate,
} from "../incomeApi";
import "./incomeView.module.css";

interface IncomeRecord {
  id: number;
  type: string;
  amount: number;
  frequency: string;
}

const IncomeView: React.FC = () => {
  // Local mock data for the income-card exercise; this does not come from an API.
  const [incomeRecords] = useState<IncomeRecord[]>([
    { id: 1, type: "Salary", amount: 50000, frequency: "Monthly" },
    { id: 2, type: "Freelance", amount: 15000, frequency: "Weekly" },
  ]);
  // API state starts empty, so JSX can show a loading message on the first render.
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [rateError, setRateError] = useState<string | null>(null);
  const [updates, setUpdates] = useState<IncomeUpdate[]>([]);
  const [updatesError, setUpdatesError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // 1. React already committed the loading UI; now start the fetch request.
    const controller = new AbortController();

    // 2. The Promise settles later. Then save the returned value as React state.
    fetchUsdToInr(controller.signal)
      .then(setExchangeRate)
      .catch((error: Error) => {
        if (error.name !== "AbortError") setRateError(error.message);
      });

    // 3. If this page leaves first, cancel the unfinished browser request.
    return () => controller.abort();
  }, []);

  useEffect(() => {
    // 1. Start a second, independent Promise through the shared Axios client.
    const controller = new AbortController();

    // 2. When it resolves, React receives the array and schedules the next render.
    fetchIncomeUpdates(controller.signal)
      .then(setUpdates)
      .catch(() => setUpdatesError("Could not load income updates."));

    // 3. Cleanup prevents an unfinished request from outliving this page.
    return () => controller.abort();
  }, []);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-3">Income records</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {incomeRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate("incomeForm")}
            >
              <h3 className="text-xl font-semibold">{record.type}</h3>
              <p className="text-gray-600">Amount: ₹{record.amount}</p>
              <p className="text-gray-600">Frequency: {record.frequency}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Live income reference — native fetch</h2>
        {/* First render: state is null, so React DOM shows this loading paragraph. */}
        {!exchangeRate && !rateError && <p className="text-sm text-gray-500 mt-2">Loading USD to INR rate…</p>}
        {rateError && <p className="text-sm text-red-600 mt-2">{rateError}</p>}
        {/* Next render: JSX reads the resolved API object and React DOM replaces Loading. */}
        {exchangeRate && (
          <p className="text-sm text-gray-700 mt-2">
            1 {exchangeRate.base} = ₹{exchangeRate.rate.toFixed(2)} {exchangeRate.quote} (reference date: {exchangeRate.date})
          </p>
        )}
      </section>

      <section className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Income updates — shared Axios client</h2>
        {/* An empty array means the request is still pending on the first render. */}
        {!updates.length && !updatesError && <p className="text-sm text-gray-500 mt-2">Loading updates…</p>}
        {updatesError && <p className="text-sm text-red-600 mt-2">{updatesError}</p>}
        {!updatesError && updates.length > 0 && (
          <ul className="mt-3 space-y-2">
            {/* Next render: map() creates one list item from each resolved API object. */}
            {updates.map((update) => (
              <li key={update.id} className="border-l-2 border-blue-500 pl-3">
                <p className="text-sm font-medium capitalize">{update.title}</p>
                <p className="text-sm text-gray-600">{update.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default IncomeView;
