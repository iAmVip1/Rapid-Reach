import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdCall } from "react-icons/md";

export default function Sample() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row items-start justify-between w-full max-w-3xl p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
        
        {/* Left Section */}
        <div className="flex items-start gap-6">
          {/* Logo */}
          <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-600">LOGO</span>
          </div>

          {/* Department Info */}
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold text-gray-800">
              Computer Science Department
            </div>

            {/* Call Now */}
            <div className="flex items-center gap-2 text-gray-700">
              <MdCall className="text-blue-500 text-lg" />
              <span className="hover:underline cursor-pointer">+977-9812345678</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-700">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>Kathmandu University, Dhulikhel</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-start gap-6 mt-6 md:mt-0">
          {/* Email */}
          <div className="flex items-center gap-2 text-gray-700">
            <FaEnvelope className="text-gray-600" />
            <span className="hover:underline cursor-pointer">
              csdept@ku.edu.np
            </span>
          </div>

          {/* Contact No */}
          <div className="flex items-center gap-2 text-gray-700">
            <FaPhoneAlt className="text-blue-500" />
            <span>+977-011-490100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
