// App.js = the top-level "which big screen am I showing" switch.
// Full notes: LEARNING_NOTES.md — Chapter on Auth & role-based access.
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Components/Auth/loginPage";
import AppLayout from "./Components/AppLayout";

// Only two real branches at this level:
//  - /login            -> always shows the login form (see loginPage.js)
//  - everything else   -> AppLayout, which itself checks "is anyone logged
//                         in?" and bounces back to /login if not (see
//                         AppLayout.js). This is why a logged-out visitor
//                         sees the login page by default, no matter what
//                         URL they land on.
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<AppLayout />} />
    </Routes>
  );
};

export default App;
