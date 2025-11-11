import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard,
  FaCar,
  FaPhone,
} from "react-icons/fa";
import { MdCall } from "react-icons/md";

export default function VehicleUI() {
  const drive = {
    firstName: "Ramesh",
    lastName: "Karki",
    company: "Toyota",
    vechicleNumber: "BA 2 CHA 5678",
    defaultAddress: "Kathmandu, Nepal",
    userMail: "ramesh.karki@example.com",
    phoneNumber1: "+977-9800000000",
    phoneNumber2: "+977-9811111111",
    licenseNo: "LN-123456",
    userImage: "https://via.placeholder.com/150",
    licenseUrls: [
      "https://via.placeholder.com/300x200?text=License+Front",
      "https://via.placeholder.com/300x200?text=License+Back",
    ],
    documentUrls: [
      "https://via.placeholder.com/300x200?text=Vehicle+Doc+1",
      "https://via.placeholder.com/300x200?text=Vehicle+Doc+2",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header / Cover */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="relative">
            <img
              src={
                drive.licenseUrls?.[0] ||
                "https://via.placeholder.com/1200x400?text=License+Image"
              }
              alt="License"
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-6 left-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg flex items-center gap-2">
                <FaCar />
                {drive.vechicleNumber} • {drive.company}
              </h2>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Section */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FaUser className="text-emerald-600" /> Driver Information
                </h2>

                {/* Mobile Image */}
                <div className="flex flex-col items-center md:hidden mb-4">
                  <img
                    src={drive.userImage}
                    alt="Driver"
                    className="w-40 h-40 rounded-full object-cover shadow-md"
                  />
                  <p className="text-sm text-gray-500 font-bold mt-2">
                    Driver Image
                  </p>
                </div>

                {/* Driver Info */}
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2">
                    <FaUser className="text-emerald-600" />
                    <span className="font-semibold">Full Name:</span>
                    <span>
                      {drive.firstName} {drive.lastName}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-emerald-600" />
                    <span className="font-semibold">Default Address:</span>
                    <span>{drive.defaultAddress}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaEnvelope className="text-emerald-600" />
                    <span className="font-semibold">Email:</span>
                    <span>{drive.userMail}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaPhone className="text-emerald-600" />
                    <span className="font-semibold">Phone 1:</span>
                    <span>{drive.phoneNumber1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaPhone className="text-emerald-600" />
                    <span className="font-semibold">Phone 2:</span>
                    <span>{drive.phoneNumber2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaIdCard className="text-emerald-600" />
                    <span className="font-semibold">License No:</span>
                    <span>{drive.licenseNo}</span>
                  </li>
                </ul>
              </div>

              {/* Driver Image (Desktop) */}
              <div className="hidden md:flex flex-col items-center">
                <a href={drive.userImage} target="_blank" rel="noreferrer">
                  <img
                    src={drive.userImage}
                    alt="Driver"
                    className="w-44 h-44 rounded-full object-cover shadow-lg hover:scale-105 transition-transform"
                  />
                </a>
                <p className="text-sm text-gray-500 font-bold mt-3">
                  Driver Image
                </p>
              </div>
            </div>

            {/* Documents Section */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* License Images */}
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FaIdCard className="text-emerald-600" /> License Images
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {drive.licenseUrls.map((u, i) => (
                    <a key={i} href={u} target="_blank" rel="noreferrer">
                      <img
                        src={u}
                        alt={`License ${i + 1}`}
                        className="w-full h-28 object-cover rounded-lg shadow hover:scale-105 transition-all"
                      />
                    </a>
                  ))}
                </div>
              </div>

              {/* Vehicle Documents */}
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FaIdCard className="text-emerald-600" /> Vehicle Documents
                </h2>
                <ul className="space-y-2">
                  {drive.documentUrls.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between bg-white border border-gray-200 rounded-md px-3 py-2 shadow-sm hover:shadow-md transition-all"
                    >
                      <a
                        href={d}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 truncate max-w-xs sm:max-w-md"
                      >
                        Document {i + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Call Button */}
            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 transition-all shadow-md">
                <MdCall className="inline mr-2 text-lg" />
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
