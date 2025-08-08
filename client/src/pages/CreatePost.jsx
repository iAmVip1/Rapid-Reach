import React from "react";

export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Please fill up the details.{" "}
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
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Longitude:
            </label>
            <input
              type="text"
              className="block w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Latitude:
            </label>
            <input
              type="text"
              className="block w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Auto Generate
            </span>
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Address:
          </label>
          <input
            type="text"
            className="block w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-100"
          />
        </div>

        {/* Website Field */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Website:
          </label>
          <input
            type="text"
            placeholder="e.g. John Smith"
            className="block w-full mt-1 border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* description */}
         <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            type="text"
            placeholder="Write a short description" 
            className="block w-full mt-1 border border-gray-300 rounded-md p-2 h-30"
          />
        </div>

        {/* Phone Field */}
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

        {/* Certification Upload */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Registration Number:
          </label>
          <input
            type="text"
            placeholder="e.g. 07991 123 456"
            className="block w-full mt-1 border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mt-4 border-teal-500 border-dotted p-3 ">
          <label className="block text-sm font-medium text-gray-700">
            Certification 
          </label>
          <div className="border-dashed border-2 border-gray-300 p-4 mt-1 text-center rounded-md cursor-pointer">
            <p className="text-gray-500">Click to upload or drag and drop</p>
          </div>
        </div>
      </form>
    </div>
  );
}
