// The "shell" a logged-in user sees: sidebar + navbar + whichever page the
// URL points to. Used to live directly inside App.js — pulled out once
// login/logout needed to decide whether to show this shell at all.
import { Suspense, useState, useCallback } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./navBar";
import SideNav from "./sideNav";
import routes from "../routes.js";
import { useAuth } from "./Auth/authContext";

const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const [sideNavOpen, setSideNavOpen] = useState(true);

  // Concept: useCallback + stale closures (see LEARNING_NOTES.md).
  // useCallback([]) keeps this the SAME function reference across every
  // re-render of AppLayout, instead of a brand new one each time — that's
  // what actually lets Navbar's memo() (see navBar.js) skip re-rendering.
  // Note the functional updater `(prev) => !prev` instead of `!sideNavOpen`
  // — with an empty deps array, this function is created ONCE, and its
  // closure would otherwise freeze `sideNavOpen` at its very first value
  // forever ("stale closure").
  const toggleSideNav = useCallback(() => {
    setSideNavOpen((prev) => !prev);
  }, []);

  // Route guard: anything under this component requires a logged-in user.
  // <Navigate replace /> swaps the current history entry instead of adding
  // a new one, so the back button doesn't bounce you between the guarded
  // page and /login forever.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

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
          {/* Suspense shows the fallback while a lazy() route's code is
              still downloading — see routes.js and LEARNING_NOTES.md */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* .map() is plain JS (Array method) turning our routes.js
                  config array into actual <Route> elements */}
              {routes.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
              {/* Landing page after login = the Asset Management overview,
                  i.e. the "client dashboard" */}
              <Route index element={<Navigate to="/assets" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
