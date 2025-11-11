import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaCar, FaPhone } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { useCall } from "../socket/CallContext";

export default function Vechicle() {
  const { startCall } = useCall() || {};
  const { driveId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const [drive, setDrive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDrive = async () => {
      try {
        setLoading(true);
        // Use owner endpoint so the owner can view even if not yet approved
        const res = await fetch(`/api/drive/owner-get/${driveId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setDrive(data);
        setLoading(false);
        setError(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchDrive();
  }, [driveId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (error || !drive) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-xl">Error loading vehicle</p>
          <p className="text-sm mt-2">Please try again later</p>
        </div>
      </div>
    );
  }
  console.log(drive);
  

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header / Cover */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="relative">
            <img
              src={drive.licenseUrls?.[0] || "https://via.placeholder.com/1200x400?text=License+Image"}
              alt="License"
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg flex items-center gap-2">
                    <FaCar />
                    {drive.vechicleNumber} • {drive.company}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main info */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FaUser className="text-emerald-600" /> Driver Information
                </h2>

                {/* Small Screen Image */}
                <div className="flex flex-col items-center md:hidden mb-4">
                  <img
                    src={drive.userImage || "https://via.placeholder.com/150"}
                    alt="User"
                    className="w-40 h-40 rounded-full object-cover shadow-md"
                  />
                  <p className="text-sm text-gray-500 font-bold mt-2">Driver Image</p>
                </div>

                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2">
                    <FaUser className="text-emerald-600" />
                    <span className="font-semibold">Full Name:</span>&nbsp;
                    {drive.firstName} {drive.lastName}
                  </li>
                  <li className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-emerald-600" />
                    <span className="font-semibold">Default Address:</span>&nbsp;
                    {drive.defaultAddress}
                  </li>
                  <li className="flex items-center gap-2">
                    <FaEnvelope className="text-emerald-600" />
                    <span className="font-semibold">Email:</span>&nbsp;
                    {drive.userMail}
                  </li>
                  <li className="flex items-center gap-2">
                    <FaPhone className="text-emerald-600" />
                    <span className="font-semibold">Phone 1:</span>&nbsp;
                    {drive.phoneNumber1}
                  </li>
                  {drive.phoneNumber2 && (
                    <li className="flex items-center gap-2">
                      <FaPhone className="text-emerald-600" />
                      <span className="font-semibold">Phone 2:</span>&nbsp;
                      {drive.phoneNumber2}
                    </li>
                  )}
                  <li className="flex items-center gap-2">
                    <FaIdCard className="text-emerald-600" />
                    <span className="font-semibold">License No:</span>&nbsp;
                    {drive.licenseNo}
                  </li>
                </ul>
              </div>

              {/* Driver image (large) */}
              <div className="hidden md:flex flex-col items-center">
                <a href={drive.userImage || "https://via.placeholder.com/400"} target="_blank" rel="noreferrer">
                  <img
                    src={drive.userImage || "https://via.placeholder.com/150"}
                    alt="userImage"
                    className="w-44 h-44 rounded-full object-cover shadow-lg hover:scale-105 transition-transform"
                  />
                </a>
                <p className="text-sm text-gray-500 font-bold mt-3">Driver Image</p>
              </div>
            </div>

            {/* Documents Section */}
            {(drive.licenseUrls?.length > 0 || drive.documentUrls?.length > 0) && (
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {drive.licenseUrls?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <FaIdCard className="text-emerald-600" /> License Images
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {drive.licenseUrls.map((u) => (
                        <a key={u} href={u} target="_blank" rel="noreferrer">
                          <img src={u} alt="License" className="w-full h-28 object-cover rounded-lg shadow" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {drive.documentUrls?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <FaIdCard className="text-emerald-600" /> Vehicle Documents
                    </h2>
                    <ul className="space-y-2">
                      {drive.documentUrls.map((d, i) => (
                        <li key={d} className="flex items-center justify-between bg-white border border-gray-200 rounded-md px-3 py-2 shadow-sm">
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
                )}
              </div>
            )}

            {/* Call Button */}
            {currentUser && drive.userRef !== currentUser._id && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => {
                    if (startCall && drive?.userRef) {
                      startCall(drive.userRef);
                    }
                  }}
                  className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 transition-all shadow-md"
                >
                  <MdCall className="inline mr-2" />
                  Call Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
