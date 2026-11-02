// src/Components/income/IncomeModule.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { IncomeProvider } from "./incomeContext";
import IncomeView from "./income-view/incomeView";
import IncomeForm from "./income-form/income-form";
import IncomeBank from "./income-bank/income-bank";

const IncomeModule: React.FC = () => {
  return (
    <IncomeProvider>
      <Routes>
        <Route index element={<IncomeView />} /> {/* default /income */}
        <Route path="incomeForm" element={<IncomeForm />} /> {/* /income/incomeForm */}
        <Route path="incomeBank" element={<IncomeBank />} /> {/* /income/incomeBank */}
      </Routes>
    </IncomeProvider>
  );
};

export default IncomeModule;
