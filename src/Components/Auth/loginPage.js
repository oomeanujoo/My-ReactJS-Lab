// The default entry point for the whole app (see App.js). A logged-out
// visitor lands here no matter what URL they typed.
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, ROLES } from "./authContext";

const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [role, setRole] = useState(ROLES.CLIENT);

  // If someone is already logged in and lands on /login anyway (e.g. typed
  // the URL directly), bounce them straight to the dashboard instead of
  // showing the form again.
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/assets", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) return;
    login({ username: username.trim(), role });
    navigate("/assets", { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-sm">
        <h1 className="text-xl font-bold text-center">Asset Management Portal</h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Mock login — pick a name and a role to continue
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. Nischaya"
              className="mt-1 w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Login as
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole(ROLES.CLIENT)}
                className={`py-2 rounded-md text-sm font-medium border ${
                  role === ROLES.CLIENT
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700"
                }`}
              >
                Client
              </button>
              <button
                type="button"
                onClick={() => setRole(ROLES.ASSET_MANAGER)}
                className={`py-2 rounded-md text-sm font-medium border ${
                  role === ROLES.ASSET_MANAGER
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700"
                }`}
              >
                Asset Manager
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {role === ROLES.CLIENT
                ? "Clients can browse, invest, and manage their own FD/MF holdings."
                : "Asset Managers can view client data and reports to explain schemes, but cannot buy, cancel, or pay on the client's behalf."}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
