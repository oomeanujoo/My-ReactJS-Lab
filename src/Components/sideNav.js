import React from "react";
import { NavLink } from "react-router-dom";

const SideNav = ({ isOpen }) => {
  const navGroups = [
    { title: "Learning · Components", items: [
      { label: "State and props — Parent / child", path: "/demo/state-props" },
    ] },
    { title: "Learning · Hooks", items: [
      { label: "useState — Update a number", path: "/demo/state-counter" },
      { label: "useRef — Choose a photo", path: "/demo/upload-photo" },
      { label: "useRef — Remember a value", path: "/demo/use-ref" },
      { label: "Hooks practice — Products", path: "/products" },
      { label: "useEffect — fix infinite API loop", path: "/demo/effect-infinite-loop" },
    ] },
    { title: "Learning · API calls", items: [
      { label: "Pagination — API list", path: "/demo/paginated-list" },
    ] },
    { title: "Learning · Forms & validation", items: [
      { label: "Complex form — state, API, rules", path: "/products/new" },
    ] },
    { title: "App · Income", items: [
    { label: "Income", path: "/income" },
    { label: "Income form", path: "/income/incomeForm" },
    { label: "Income bank", path: "/income/incomeBank" },
    ] },
    { title: "App · Assets", items: [
    { label: "Assets", path: "/assets" },
    { label: "Fixed Deposits", path: "/assets/fd" },
    { label: "Mutual Funds", path: "/assets/mf" },
    { label: "Reports", path: "/assets/reports" },
    ] },
  ];

  return (
    <div
      className={`bg-gray-800 text-white h-screen shrink-0 overflow-y-auto transition-all duration-300
        ${isOpen ? "w-64" : "w-16"}`}
    >
      {/* Logo / Title */}
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-xl font-bold">{isOpen ? "React Learning Lab" : "R"}</h1>
      </div>

      {/* Nav links */}
      <nav aria-label="Learning and app pages" className="p-3 space-y-5">
        {navGroups.map(({ title, items }) => (
          <section key={title} aria-label={title}>
            <h2 className={isOpen ? "px-3 mb-2 text-xs font-semibold uppercase text-gray-400" : "sr-only"}>
              {title}
            </h2>
            <div className="flex flex-col space-y-1">
        {items.map(({ label, path }) => (
          <NavLink
            key={label}
            to={path}
            end
            title={label}
            aria-label={label}
            className={({ isActive }) =>
              `text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "bg-gray-900" : ""
              }`
            }
          >
            {isOpen ? label : label[0]}
          </NavLink>
        ))}
            </div>
          </section>
        ))}
      </nav>
    </div>
  );
};

export default SideNav;
