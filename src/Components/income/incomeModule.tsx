// src/Components/income/IncomeModule.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { IncomeProvider } from "./incomeContext.tsx";
import IncomeView from "./income-view/incomeView.tsx";
import IncomeForm from "./income-form/income-form.tsx";
import IncomeBank from "./income-bank/income-bank.tsx";

const IncomeModule: React.FC = () => {
  return (
    <IncomeProvider>
      <Routes>
        <Route index element={<IncomeView />} /> {/* default /income */}
        <Route path="incomeForm" element={<IncomeForm />} /> {/* /income/form */}
        <Route path="incomeBank" element={<IncomeBank />} /> {/* /income/bank */}
      </Routes>
    </IncomeProvider>
  );
};

export default IncomeModule;
