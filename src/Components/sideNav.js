import React from "react";
import { NavLink } from "react-router-dom";

const SideNav = ({ isOpen }) => {
  // Explicit mapping of labels to routes
  const navItems = [
    { label: "Overview", path: "/overview" },
    { label: "Users", path: "/users" },
    { label: "Analytics", path: "/analytics" },
    { label: "Settings", path: "/settings" },
    { label: "Form", path: "/income" },
  ];

  return (
    <div
      className={`bg-gray-800 text-white h-screen transition-all duration-300 
        ${isOpen ? "w-64" : "w-16"}`}
    >
      {/* Logo / Title */}
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-xl font-bold">{isOpen ? "Dashboard" : "D"}</h1>
      </div>

      {/* Nav links */}
      <div className="flex flex-col p-4 space-y-4">
        {navItems.map(({ label, path }) => (
          <NavLink
            key={label}
            to={path}
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
    </div>
  );
};

export default SideNav;
