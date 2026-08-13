import React, { memo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, ROLES } from "./Auth/authContext";

// Concept: React.memo + referential equality (see LEARNING_NOTES.md).
// Wrapped in memo() so this component skips re-rendering when its props
// are unchanged by reference. The renderCount badge below is study
// instrumentation, not a real product feature — it makes that skip visible.
const Navbar = memo(function Navbar({ toggleSideNav }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // useRef, not useState: bumping this must NOT itself cause a re-render
  // (that would defeat the point of watching how many renders happen).
  const renderCount = useRef(0);
  renderCount.current += 1;

  // Concept: useEffect dependency array + cleanup (see LEARNING_NOTES.md).
  //   useEffect(fn)      -> runs after EVERY render (rare, usually a mistake)
  //   useEffect(fn, [])  -> runs ONCE, right when this component first appears
  //   useEffect(fn, [x]) -> runs again whenever x changes (see fdContext.js)
  // The function returned from inside the effect is "cleanup" — it runs
  // right before this component disappears from the screen.
  const [sessionSeconds, setSessionSeconds] = useState(0);
  useEffect(() => {
    // Concept: stale closure (see LEARNING_NOTES.md).
    // This effect runs ONCE ([] deps), so this whole function — including
    // setInterval's inner callback — is created a single time and never
    // rebuilt. If that inner callback read `sessionSeconds` directly, it
    // would forever see the value from that one render (0), and the timer
    // would get stuck at 1 forever instead of counting up. Using the
    // updater form `(s) => s + 1` sidesteps the problem entirely: React
    // hands it the CURRENT value when the interval actually fires, instead
    // of trusting a variable frozen inside this old closure.
    const intervalId = setInterval(() => {
      setSessionSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Toggle button */}
        <button
          onClick={toggleSideNav}
          className="text-gray-300 hover:text-white focus:outline-none"
        >
          ☰
        </button>

        {/* Brand / Center */}
        <h1 className="text-lg font-bold">
          My React Lab{" "}
          <span className="text-xs text-gray-400 font-normal">
            (Navbar renders: {renderCount.current}, session: {sessionSeconds}s)
          </span>
        </h1>

        {/* Right side: who's logged in + logout */}
        <div className="flex items-center space-x-4">
          {user && (
            <span className="text-sm text-gray-300">
              {user.username}{" "}
              <span
                className={`ml-1 text-xs px-2 py-1 rounded-full ${
                  user.role === ROLES.CLIENT
                    ? "bg-blue-600 text-white"
                    : "bg-yellow-500 text-gray-900"
                }`}
              >
                {user.role === ROLES.CLIENT ? "Client" : "Asset Manager"}
              </span>
            </span>
          )}
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-white text-sm border border-gray-600 rounded-md px-3 py-1"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
