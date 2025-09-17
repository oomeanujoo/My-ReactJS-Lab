// src/routes.ts
import { lazy } from "react";

const routes = [
  {
    path: "/income/*", // The * allows nested routes inside IncomeModule
    component: lazy(() => import("./Components/income/incomeModule.tsx")),
  },
];

export default routes;
