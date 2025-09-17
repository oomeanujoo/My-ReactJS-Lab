// src/Components/income/income-form/incomeForm.tsx
import React, { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useIncome } from "../incomeContext.tsx"; // import context

const IncomeForm: React.FC = () => {
  const { formData, setFormData } = useIncome(); // use context
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const incomeTypes = ["Salary", "Freelance", "Investment", "Rental"];
  const frequencies = ["Monthly", "Weekly", "Yearly"];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Income Type */}
      <div>
        <label htmlFor="incomeType" className="block text-sm font-medium">
          Income Type
        </label>
        <select
          id="incomeType"
          name="incomeType"
          value={formData.incomeType}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Income Type</option>
          {incomeTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Frequency */}
      <div>
        <label htmlFor="frequency" className="block text-sm font-medium">
          Frequency
        </label>
        <select
          id="frequency"
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Frequency</option>
          {frequencies.map((freq) => (
            <option key={freq} value={freq}>
              {freq}
            </option>
          ))}
        </select>
      </div>

      {/* Company Name */}
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Amount */}
      <div>
        <label htmlFor="amount" className="block text-sm font-medium">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Navigate to Bank Form */}
      <button
        type="button"
        onClick={() => navigate("incomeBank")}
        className="w-full py-2 bg-green-600 text-white rounded-md"
      >
        Add Bank Details
      </button>

      {/* Submit */}
      <div className="space-y-2">
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default IncomeForm;
