// src/Components/income/IncomeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface IncomeFormData {
  incomeType: string;
  frequency: string;
  companyName: string;
  amount: string;
  bankName?: string;
  branch?: string;
}

interface IncomeContextType {
  formData: IncomeFormData;
  setFormData: React.Dispatch<React.SetStateAction<IncomeFormData>>;
}

const IncomeContext = createContext<IncomeContextType | undefined>(undefined);

export const useIncome = () => {
  const context = useContext(IncomeContext);
  if (!context) throw new Error("useIncome must be used within IncomeProvider");
  return context;
};

export const IncomeProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<IncomeFormData>({
    incomeType: "",
    frequency: "",
    companyName: "",
    amount: "",
    bankName: "",
    branch: "",
  });

  return (
    <IncomeContext.Provider value={{ formData, setFormData }}>
      {children}
    </IncomeContext.Provider>
  );
};
