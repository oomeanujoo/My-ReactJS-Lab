import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./incomeView.module.css";

interface IncomeRecord {
  id: number;
  type: string;
  amount: number;
  frequency: string;
}

const IncomeView: React.FC = () => {
  const [incomeRecords, setIncomeRecords] = useState<IncomeRecord[]>([
    { id: 1, type: "Salary", amount: 50000, frequency: "Monthly" },
    { id: 2, type: "Freelance", amount: 15000, frequency: "Weekly" },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch logic if needed
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {incomeRecords.map((record) => (
        <div
          key={record.id}
          className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate("incomeForm")} // << relative path
        >
          <h3 className="text-xl font-semibold">{record.type}</h3>
          <p className="text-gray-600">Amount: ₹{record.amount}</p>
          <p className="text-gray-600">Frequency: {record.frequency}</p>
        </div>
      ))}
    </div>
  );
};

export default IncomeView;
