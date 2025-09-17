// src/Components/income/income-bank/incomeBank.tsx
import React, { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useIncome } from "../incomeContext.tsx"; // use the context

const IncomeBank: React.FC = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useIncome(); // get data from context

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Bank form submitted:", formData);
    // optionally navigate back or elsewhere
  };

  // Dummy dropdown values
  const bankNames = ["HDFC Bank", "ICICI Bank", "SBI Bank", "Axis Bank"];
  const branches = ["Mumbai", "Delhi", "Bangalore", "Chennai"];

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-blue-600 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        Back
      </button>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* Bank Name */}
        <div>
          <label
            htmlFor="bankName"
            className="block text-sm font-medium text-gray-700"
          >
            Bank Name
          </label>
          <select
            id="bankName"
            name="bankName"
            value={formData.bankName || ""}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Bank</option>
            {bankNames.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </div>

        {/* Branch */}
        <div>
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Branch
          </label>
          <select
            id="branch"
            name="branch"
            value={formData.branch || ""}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        {/* Submit button full width */}
        <div className="col-span-1 sm:col-span-2">
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Save Bank Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeBank;
