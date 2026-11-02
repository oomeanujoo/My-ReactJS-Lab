// src/routes.ts
import { lazy } from "react";

const routes = [
  {
    path: "/demo/state-props",
    component: lazy(() => import("./Components/InterviewPrep/StatePropsDemo.tsx")),
  },
  {
    path: "/demo/state-counter",
    component: lazy(() => import("./Components/InterviewPrep/StateCounterDemo.tsx")),
  },
  {
    path: "/demo/upload-photo",
    component: lazy(() => import("./Components/InterviewPrep/UploadPhotoDemo.tsx")),
  },
  {
    path: "/demo/use-ref",
    component: lazy(() => import("./Components/InterviewPrep/RefDemo.js")),
  },
  {
    path: "/demo/effect-infinite-loop",
    component: lazy(() => import("./Components/InterviewPrep/UseEffectInfiniteLoopDemo.tsx")),
  },
  {
    path: "/products/*", // Load the Products module when this route is opened.
    component: lazy(() => import("./Components/products/productsModule.tsx")),
  },
  {
    path: "/income/*", // The * allows nested routes inside IncomeModule
    component: lazy(() => import("./Components/income/incomeModule.tsx")),
  },
  {
    path: "/assets/*", // The * allows nested routes inside AssetManagementModule
    component: lazy(() => import("./Components/AssetManagement/assetManagementModule.js")),
  },
  {
    path: "/demo/paginated-list", // No nested routes here, so no trailing /*
    component: lazy(() => import("./Components/InterviewPrep/PaginatedList/paginatedPostsList.js")),
  },
];

export default routes;
