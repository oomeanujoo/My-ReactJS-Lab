// Mock FD (Fixed Deposit) scheme catalogue.
// In the real company project this would come from the Spring Boot backend
// (e.g. GET /api/fd/schemes). We hardcode it here so the whole app can run
// with zero backend, purely as a study project.

const fdSchemes = [
  {
    id: "fd-hdfc-1",
    issuer: "HDFC Bank",
    type: "Bank",
    interestRate: 7.1,
    seniorCitizenRate: 7.6,
    minTenureMonths: 12,
    maxTenureMonths: 120,
    minAmount: 5000,
    payoutOptions: ["Cumulative", "Monthly", "Quarterly"],
  },
  {
    id: "fd-sbi-1",
    issuer: "State Bank of India",
    type: "Bank",
    interestRate: 6.8,
    seniorCitizenRate: 7.3,
    minTenureMonths: 6,
    maxTenureMonths: 120,
    minAmount: 1000,
    payoutOptions: ["Cumulative", "Quarterly"],
  },
  {
    id: "fd-bajaj-1",
    issuer: "Bajaj Finance",
    type: "NBFC",
    interestRate: 8.05,
    seniorCitizenRate: 8.3,
    minTenureMonths: 12,
    maxTenureMonths: 60,
    minAmount: 15000,
    payoutOptions: ["Cumulative", "Monthly", "Annual"],
  },
  {
    id: "fd-shriram-1",
    issuer: "Shriram Finance",
    type: "NBFC",
    interestRate: 8.4,
    seniorCitizenRate: 8.8,
    minTenureMonths: 12,
    maxTenureMonths: 60,
    minAmount: 5000,
    payoutOptions: ["Cumulative", "Monthly"],
  },
  {
    id: "fd-icici-1",
    issuer: "ICICI Bank",
    type: "Bank",
    interestRate: 7.0,
    seniorCitizenRate: 7.5,
    minTenureMonths: 7,
    maxTenureMonths: 120,
    minAmount: 10000,
    payoutOptions: ["Cumulative", "Monthly", "Quarterly"],
  },
];

export default fdSchemes;

// Compound-interest maturity estimate for a "Cumulative" FD (interest
// reinvested, paid out only at maturity). Real banks use day-count
// conventions (actual/365, quarterly compounding, etc.) — this is a
// simplified annual-compounding version, good enough for a demo/study app.
export function estimateMaturityValue(principal, annualRatePercent, tenureMonths) {
  const years = tenureMonths / 12;
  const rate = annualRatePercent / 100;
  const maturityValue = principal * Math.pow(1 + rate, years);
  return Math.round(maturityValue);
}
