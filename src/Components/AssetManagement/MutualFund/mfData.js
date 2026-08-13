// Mock Mutual Fund scheme catalogue. Real project would fetch this from the
// Spring Boot backend, which in turn likely pulled it from CAMS/RTA feeds.

const mfSchemes = [
  {
    id: "mf-bluechip",
    name: "Axis Bluechip Fund",
    category: "Equity - Large Cap",
    risk: "Moderately High",
    nav: 52.34,
    oneYearReturn: 18.2,
    threeYearReturn: 15.6,
    minSip: 500,
    minLumpsum: 5000,
  },
  {
    id: "mf-smallcap",
    name: "Nippon India Small Cap Fund",
    category: "Equity - Small Cap",
    risk: "Very High",
    nav: 148.9,
    oneYearReturn: 28.4,
    threeYearReturn: 24.1,
    minSip: 500,
    minLumpsum: 5000,
  },
  {
    id: "mf-debt-liquid",
    name: "HDFC Liquid Fund",
    category: "Debt - Liquid",
    risk: "Low",
    nav: 4123.5,
    oneYearReturn: 6.8,
    threeYearReturn: 6.2,
    minSip: 1000,
    minLumpsum: 10000,
  },
  {
    id: "mf-hybrid",
    name: "ICICI Prudential Balanced Advantage Fund",
    category: "Hybrid",
    risk: "Moderate",
    nav: 62.15,
    oneYearReturn: 13.5,
    threeYearReturn: 11.9,
    minSip: 1000,
    minLumpsum: 5000,
  },
  {
    id: "mf-index",
    name: "UTI Nifty 50 Index Fund",
    category: "Equity - Index",
    risk: "Moderately High",
    nav: 178.6,
    oneYearReturn: 16.9,
    threeYearReturn: 14.8,
    minSip: 500,
    minLumpsum: 1000,
  },
];

export default mfSchemes;

// Very simplified "what would my money be worth today" estimate. Real
// returns compound daily with NAV changing every trading day — this just
// applies the scheme's historical 1-year return as a flat rate, purely to
// demonstrate "derived/computed value from stored state" in the UI.
export function estimateCurrentValue(investedAmount, oneYearReturnPercent) {
  return Math.round(investedAmount * (1 + oneYearReturnPercent / 100));
}
