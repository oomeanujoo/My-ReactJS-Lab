  import { Suspense, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import Navbar from "./Components/navBar";
import SideNav from "./Components/sideNav";
import routes from "./routes.js";

  const App = () => {
    const [sideNavOpen, setSideNavOpen] = useState(true);

    const toggleSideNav = () => {
      setSideNavOpen(!sideNavOpen);
    };

    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <SideNav isOpen={sideNavOpen} />

        {/* Main content area */}
        <div className="flex flex-col flex-1 transition-all duration-300">
          {/* Navbar */}
          <Navbar toggleSideNav={toggleSideNav} />

          {/* Page content */}
          <main className="p-6 transition-all duration-300">
             <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
              {/* optional default route */}
              <Route index element={<div>Dashboard</div>} />
            </Routes>
          </Suspense>
        {/* <IncomeView /> */}
      {/* </Suspense> */}
          </main>
        </div>
      </div>
    );
  };

  export default App;
