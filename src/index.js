// This file is the ONE bridge between plain HTML/JS and React.
// Full concept notes: see LEARNING_NOTES.md > "How this project boots up"
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './Components/Auth/authContext';
import './index.css';
import reportWebVitals from './reportWebVitals';

// document.getElementById is plain vanilla JS (DOM API) — finds the
// <div id="root"> sitting in public/index.html.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // BrowserRouter must wrap everything else so any component inside
  // App can use routing (useNavigate, <Link>, etc.)
  // AuthProvider sits just inside it, so both the login page and every
  // protected page can call useAuth() to check who's logged in.
 <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
