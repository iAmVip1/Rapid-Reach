import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { MdMenu } from "react-icons/md";

const MobileSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Toggle Button (only visible on mobile) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-1/2 left-0 -translate-y-1/2 bg-pink-600 text-white px-3 py-2 rounded-r-full shadow-lg z-40 lg:hidden hover:bg-pink-700 transition"
          aria-label="Open Menu"
        >
          <MdMenu className="w-5 h-5" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-white border border-gray-200 rounded-r-xl shadow-lg p-6 w-64 transform z-30
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:hidden`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-gray-700 bg-white shadow rounded-lg p-2 hover:bg-gray-100 transition"
          aria-label="Close Menu"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>

        <h2 className="text-sm font-semibold text-gray-900 uppercase mb-5">Menu</h2>
        <ul className="space-y-4 text-gray-700">
          <li className="hover:text-pink-600 cursor-pointer">Home</li>
          <li className="hover:text-pink-600 cursor-pointer">Shop</li>
          <li className="hover:text-pink-600 cursor-pointer">Categories</li>
          <li className="hover:text-pink-600 cursor-pointer">Contact</li>
        </ul>
      </aside>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-white/40 backdrop-blur-sm z-20"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default MobileSidebar;
