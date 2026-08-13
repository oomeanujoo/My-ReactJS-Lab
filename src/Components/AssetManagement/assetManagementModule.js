// Top-level module for everything under /assets/*.
// Both providers live HERE (not inside FdModule/MfModule) so the Reports
// page — which needs both useFd() and useMf() at once — can read them.
// Nesting order doesn't matter between FdProvider/MfProvider since they
// don't depend on each other, only that both wrap everything below.
import { Routes, Route } from "react-router-dom";
import { FdProvider } from "./FixedDeposit/fdContext";
import { MfProvider } from "./MutualFund/mfContext";
import AssetOverview from "./assetOverview";
import FdModule from "./FixedDeposit/fdModule";
import MfModule from "./MutualFund/mfModule";
import ReportsModule from "./Reports/reportsModule";

const AssetManagementModule = () => {
  return (
    <FdProvider>
      <MfProvider>
        <Routes>
          <Route index element={<AssetOverview />} /> {/* /assets */}
          <Route path="fd/*" element={<FdModule />} /> {/* /assets/fd/... */}
          <Route path="mf/*" element={<MfModule />} /> {/* /assets/mf/... */}
          <Route path="reports" element={<ReportsModule />} /> {/* /assets/reports */}
        </Routes>
      </MfProvider>
    </FdProvider>
  );
};

export default AssetManagementModule;
