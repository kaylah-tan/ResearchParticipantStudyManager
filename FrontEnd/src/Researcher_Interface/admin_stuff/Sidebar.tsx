import React from "react";
import { Link } from "react-router-dom";

export const Sidebar: React.FC<{
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform ${
        isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-64 w-0"
      } md:w-64 md:translate-x-0`}
    >
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <button onClick={toggleSidebar} className="md:hidden bg-gray-700 p-2 rounded">
          ☰
        </button>
      </div>
      <nav className="mt-6">
        <Link to="/" className="block py-2.5 px-4 hover:bg-gray-700">
          Dashboard
        </Link>
        <Link to="/studies" className="block py-2.5 px-4 hover:bg-gray-700">
          Studies
        </Link>
        <Link to="/settings" className="block py-2.5 px-4 hover:bg-gray-700">
          Settings
        </Link>
      </nav>
    </aside>
  );
};
