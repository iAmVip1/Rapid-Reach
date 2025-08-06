import React from 'react';
import { FaTimes } from 'react-icons/fa';

export default function DashSideMobile({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-gradient-to-br from-blue-900 to-purple-800 text-white z-20 p-4 
        transform transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}
      >
        {/* Header with X */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Menu</h1>
          <button
            type="button"
            className="text-white text-xl"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 mb-4"
        />

        {/* Static Menu Items */}
        <ul className="space-y-3">
          <li className="bg-purple-600 p-2 rounded-md cursor-pointer hover:bg-purple-700">
            Dashboard
          </li>
          <li className="bg-purple-600 p-2 rounded-md cursor-pointer hover:bg-purple-700">
            Profile
          </li>
          <li className="bg-purple-600 p-2 rounded-md cursor-pointer hover:bg-purple-700">
            Settings
          </li>
          <li className="bg-purple-600 p-2 rounded-md cursor-pointer hover:bg-purple-700">
            Logout
          </li>
        </ul>
      </aside>
    </>
  );
}
