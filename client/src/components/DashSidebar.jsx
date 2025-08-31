import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { IoMdDocument } from "react-icons/io";
import { useSelector } from "react-redux";

export default function DashSideBar() {
  const [isHovered, setIsHovered] = useState(false);
  const DashSideBarWidth = isHovered ? "w-64" : "w-16";
  const { currentUser } = useSelector((state) => state.user);

  let userRole = "";

if (currentUser?.isAdmin) {
  userRole = "Admin";
} else if (currentUser?.isHospital) {
  userRole = "Hospital";
} else if (currentUser?.isFireDep) {
  userRole = "Fire Department";
} else if (currentUser?.isPoliceDep) {
  userRole = "Police Department";
} else if (currentUser?.isBlood) {
  userRole = "Blood Bank";
} else if (currentUser?.isPoliceVAn) {
  userRole = "Police Vehicle";
} else if (currentUser?.isAmbulance) {
  userRole = "Ambulance";
} else if (currentUser?.isFireTruck) {
  userRole = "Fire Truck";
}

  return (
    <div className="flex h-screen">
      {/* DashSideBar (desktop only) */}
      <div
        className={`hidden md:flex flex-col bg-white shadow-md transition-all duration-300 ease-in-out ${DashSideBarWidth}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_the_Red_Cross.svg"
              alt="Logo"
              className="h-6 w-6"
            />
            {isHovered && (
              <span className="font-bold text-lg">Rapid Reach</span>
            )}
          </div>
        </div>

        
          {isHovered && (
             <div className="flex items-center gap-3 px-4 py-2  rounded-md text-sm font-medium text-gray-700">
     <span>{userRole}</span>
  </div>
          )}

        {/* Navigation */}
        <div className="mt-6">
          
          {isHovered && (
            <p className="px-4 text-xs text-gray-500 mb-1">NAVIGATION</p>
          )}
          <ul className="space-y-1">
            {currentUser.isAdmin ? (
              <>
                <li>
                  <Link
                    to="/dashboard?tab=home"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-md text-sm font-medium text-gray-700"
                  >
                    <HomeIcon className="w-5 h-5" />
                    {isHovered && <span>Dashboard</span>}
                  </Link>
                </li>
              </>
            ) : null}

            <li>
              <Link
                to="/dashboard?tab=profile"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-md text-sm font-medium text-gray-700"
              >
                <CgProfile className="w-5 h-5" />
                {isHovered && <span>Profile</span>}
              </Link>
            </li>
            {!currentUser.isAdmin && (
              <li>
                <Link
                  to="/dashboard?tab=documents"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-md text-sm font-medium text-gray-700"
                >
                  <IoMdDocument className="w-5 h-5" />
                  {isHovered && <span>Documents</span>}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
