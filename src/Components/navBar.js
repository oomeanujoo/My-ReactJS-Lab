import React from "react";

const Navbar = ({ toggleSideNav }) => {
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
        <h1 className="text-lg font-bold">My React Lab</h1>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <button className="hover:text-gray-400">🔔</button>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            alt="user avatar"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
