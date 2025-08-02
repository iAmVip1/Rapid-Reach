import React, { useState } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyDropdown, setCompanyDropdown] = useState(false);

  const navItems = [
    { label: "Home", href: "#", active: true },
    { label: "Arch Services", href: "#" },
    { label: "Arch Shop", href: "#" },
    { label: "Partners", href: "#" },
  ];

  return (
    <nav className="w-full border-b shadow-sm bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 bg-gray-50 px-6 py-2 rounded-full">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium ${
                item.active ? "text-black" : "text-gray-600"
              } hover:text-black`}
            >
              {item.label}
            </a>
          ))}
          {/* Company dropdown */}
          <div className="relative">
            <button
              onClick={() => setCompanyDropdown(!companyDropdown)}
              className="flex items-center text-gray-600 hover:text-black text-sm font-medium"
            >
              Company <FaChevronDown className="ml-1 text-xs" />
            </button>
            {companyDropdown && (
              <div className="absolute mt-2 w-40 bg-white border rounded shadow z-10">
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  About Us
                </a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  Careers
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="px-4 py-2 text-sm border rounded hover:bg-gray-100">
            Log In
          </button>
          <button className="px-4 py-2 text-sm border rounded hover:bg-gray-100">
            Become a Supplier
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-4 space-y-2 border-t">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`block text-sm ${
                item.active ? "text-black font-medium" : "text-gray-600"
              }`}
            >
              {item.label}
            </a>
          ))}
          <div>
            <button
              onClick={() => setCompanyDropdown(!companyDropdown)}
              className="flex items-center text-gray-600 hover:text-black text-sm font-medium"
            >
              Company <FaChevronDown className="ml-1 text-xs" />
            </button>
            {companyDropdown && (
              <div className="ml-4 mt-1 space-y-1">
                <a href="#" className="block text-sm text-gray-600 hover:text-black">
                  About Us
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-black">
                  Careers
                </a>
              </div>
            )}
          </div>
          <hr />
          <div className="space-y-2">
            <button className="w-full px-4 py-2 text-sm border rounded hover:bg-gray-100">
              Log In
            </button>
            <button className="w-full px-4 py-2 text-sm border rounded hover:bg-gray-100">
              Become a Supplier
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}