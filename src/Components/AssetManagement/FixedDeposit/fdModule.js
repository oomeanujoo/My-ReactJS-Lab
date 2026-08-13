// Sub-router for everything under /assets/fd/*, same pattern as the
// existing Income module (see incomeModule.tsx).
// Note: FdProvider is NOT wrapped here — it's lifted up to
// assetManagementModule.js, because the Reports page also needs to read
// FD data (via useFd()) alongside MF data. Context only works inside its
// own Provider, so the provider has to live above every consumer.
import { Routes, Route } from "react-router-dom";
import FdList from "./fdList";
import FdCompare from "./fdCompare";
import FdInvestForm from "./fdInvestForm";
import MyFds from "./myFds";

const FdModule = () => {
  return (
    <Routes>
      <Route index element={<FdList />} /> {/* /assets/fd */}
      <Route path="compare" element={<FdCompare />} /> {/* /assets/fd/compare */}
      <Route path="invest/:id" element={<FdInvestForm />} /> {/* /assets/fd/invest/:id */}
      <Route path="my" element={<MyFds />} /> {/* /assets/fd/my */}
    </Routes>
  );
};

export default FdModule;
