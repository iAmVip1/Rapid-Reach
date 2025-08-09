import React, { useState } from "react";

export default function Testing() {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "latitude" || name === "longitude") {
      const lat = name === "latitude" ? value : formData.latitude;
      const lng = name === "longitude" ? value : formData.longitude;

      if (lat && lng) {
        fetchAddress(lat, lng);
      }
    }
  };

  const fetchAddress = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      if (data.display_name) {
        setFormData((prev) => ({
          ...prev,
          address: data.display_name,
        }));
      }
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 border rounded-md">
      <label className="block mb-2">Latitude</label>
      <input
        type="text"
        name="latitude"
        value={formData.latitude}
        onChange={handleChange}
        className="block w-full mb-3 p-2 border rounded"
      />

      <label className="block mb-2">Longitude</label>
      <input
        type="text"
        name="longitude"
        value={formData.longitude}
        onChange={handleChange}
        className="block w-full mb-3 p-2 border rounded"
      />

      <label className="block mb-2">Address</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        readOnly
        className="block w-full mb-3 p-2 border rounded bg-gray-100"
      />
    </div>
  );
}
