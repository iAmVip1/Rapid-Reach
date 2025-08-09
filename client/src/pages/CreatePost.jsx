import React, { useState } from "react";
import axios from "axios";

export default function CreatePost() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [preview, setPreview] = useState(null);

  // Auto-generate location
  const handleAutoGenerateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLongitude(pos.coords.longitude.toFixed(6));
          setLatitude(pos.coords.latitude.toFixed(6));
        },
        (err) => {
          console.error(err);
          alert("Unable to fetch location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Image upload
  const handleUploadImage = async (e) => {
    e.preventDefault();
    try {
      if (!image) {
        return alert("Please select an image first");
      }
      setLoadingImage(true);

      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", "test-image");
      imageData.append("cloud_name", "dyy6csn97");

      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dyy6csn97/image/upload",
        imageData
      );

      setUrl(data.secure_url);
    } catch (error) {
      console.log(error);
      alert("Image upload failed!");
    } finally {
      setLoadingImage(false);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file)); // Create a preview URL
    } else {
      setPreview(null);
    }
  };

  console.log(url);

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Please fill up the details.
      </h1>
      <form>
        {/* Dept name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department Name
          </label>
          <input
            type="text"
            className="block w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-100"
          />
        </div>

        {/* Location Field */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Longitude:
            </label>
            <input
              type="text"
              value={longitude}
              readOnly
              className="block w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Latitude:
            </label>
            <input
              type="text"
              value={latitude}
              readOnly
              className="block w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleAutoGenerateLocation}
              className="bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white px-5 py-2.5 rounded-md font-medium shadow-md"
            >
              Auto Generate
            </button>
          </div>
        </div>

        {/* Address */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Address:
          </label>
          <input
            type="text"
            className="block w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-100"
          />
        </div>

        {/* Website */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Website:
          </label>
          <input
            type="text"
            placeholder="e.g. example.com"
            className="block w-full mt-1 border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            placeholder="Write a short description"
            className="block w-full mt-1 border border-gray-300 rounded-md p-2 h-30"
          />
        </div>

        {/* Phone Fields */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number:
          </label>
          <input
            type="text"
            placeholder="e.g. 07991 123 456"
            className="block w-full mt-1 border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Registration */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Registration Number:
          </label>
          <input
            type="text"
            placeholder="e.g. 123456789"
            className="block w-full mt-1 border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Certification Upload */}
        <div className="mt-4 border border-dotted border-teal-500 p-3 rounded-md">
          <label className="block text-sm font-medium text-gray-700">
            Certification
          </label>
          <div className="max-w-md mx-auto rounded-lg overflow-hidden">
            <div className="relative h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              {!preview ? (
                <div className="absolute flex flex-col items-center pointer-events-none">
                  <img
                    alt="File Icon"
                    className="mb-3"
                    src="https://img.icons8.com/dusk/64/000000/file.png"
                  />
                  <span className="block text-gray-500 font-semibold">
                    Drag & drop your files here
                  </span>
                  <span className="block text-gray-400 font-normal mt-1">
                    or click to upload
                  </span>
                </div>
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover rounded-lg"
                />
              )}
              <input
                type="file"
                accept="image/*"
                className="h-full w-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleUploadImage}
              className="border-2 rounded-md hover:bg-blue-500 hover:text-white border-blue-500 py-2 px-6 font-bold"
            >
              {loadingImage ? "Uploading..." : "Upload"}
            </button>
          </div>

          {/* Uploaded Image Preview */}
          {url && (
            <div className="flex justify-center mt-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Uploaded Image:</h3>
                <img
                  src={url}
                  alt="Uploaded"
                  className="rounded shadow-md w-64"
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
