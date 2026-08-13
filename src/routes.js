// src/routes.ts
import { lazy } from "react";

const routes = [
  {
    path: "/income/*", // The * allows nested routes inside IncomeModule
    component: lazy(() => import("./Components/Income/incomeModule.tsx")),
  },
  {
    path: "/assets/*", // The * allows nested routes inside AssetManagementModule
    component: lazy(() => import("./Components/AssetManagement/assetManagementModule.js")),
  },
];

export default routes;
