import React from "react";
import { HiOutlineMail, HiLocationMarker } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { TbPhoneCall } from "react-icons/tb";

export default function Sample() {
  return (
    <div className="flex flex-col p-6 max-w-md space-y-4 ">
      {/* Department Name and Email on the same line, left and right aligned */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 border border-gray-400 flex items-center justify-center">
            {/* Placeholder for Logo */}
            <span className="text-gray-400 text-xs">LOGO</span>
          </div>
          <span className="text-sm font-medium">Department Name</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
          <HiOutlineMail size={20} />
          <span>Email</span>
        </div>
      </div>

      {/* Call Now and Contact No on the same line, left and right aligned */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
          <FiPhoneCall size={20} />
          <span>Call now</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
          <TbPhoneCall size={20} />
          <span>Contact No</span>
        </div>
      </div>

      {/* Location in a separate line, centered */}
      <div className="flex justify-center items-center space-x-2 text-sm text-gray-600 cursor-pointer">
        <HiLocationMarker size={20} />
        <span>Location</span>
      </div>
    </div>
  );
}
