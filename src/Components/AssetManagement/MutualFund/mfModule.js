// Sub-router for everything under /assets/mf/*
// Note: MfProvider is lifted up to assetManagementModule.js, same reason as
// FdModule.js — the Reports page needs both FD and MF context together.
import { Routes, Route } from "react-router-dom";
import MfList from "./mfList";
import MfSchemeDetail from "./mfSchemeDetail";
import MfSubscriptions from "./mfSubscriptions";

const MfModule = () => {
  return (
    <Routes>
      <Route index element={<MfList />} /> {/* /assets/mf */}
      <Route path="scheme/:id" element={<MfSchemeDetail />} /> {/* /assets/mf/scheme/:id */}
      <Route path="subscriptions" element={<MfSubscriptions />} /> {/* /assets/mf/subscriptions */}
    </Routes>
  );
};

export default MfModule;
