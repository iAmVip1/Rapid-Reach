import React, { useState } from "react";
import {
  HomeIcon,
  LayoutIcon,
  ClipboardIcon,
  MousePointerClickIcon,
  DivideSquareIcon,
  SquareStackIcon,
} from "lucide-react";

const navItems = [
  { icon: HomeIcon, label: "Dashboard" },
  { icon: LayoutIcon, label: "CMS" },
  { icon: ClipboardIcon, label: "Forms" },
  { icon: MousePointerClickIcon, label: "Clicks" },
  { icon: DivideSquareIcon, label: "Split Testing" },
];

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const sidebarWidth = isHovered ? "w-64" : "w-16";

  return (
    <div className="flex h-screen">
      {/* Sidebar (desktop only) */}
      <div
        className={`hidden md:flex flex-col bg-white shadow-md transition-all duration-300 ease-in-out ${sidebarWidth}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Logo" className="h-6 w-6" />
            {isHovered && <span className="font-bold text-lg">Rapid Reach</span>}
          </div>
          
        </div>

        {/* Navigation */}
        <div className="mt-6">
          {isHovered && (
            <p className="px-4 text-xs text-gray-500 mb-1">NAVIGATION</p>
          )}
          <ul className="space-y-1">
            {navItems.map(({ icon: Icon, label }) => (
              <li key={label}>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-md text-sm font-medium text-gray-700"
                >
                  <Icon className="w-5 h-5" />
                  {isHovered && <span>{label}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

   
    </div>
  );
}
