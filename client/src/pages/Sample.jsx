export default function CreatePostUI() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen ">
      <h1 className="text-center text-3xl my-7 font-semibold text-gray-800">
        Please fill up the details.
      </h1>

      <form className="space-y-6 bg-white shadow-md p-6 rounded-2xl">

        {/* Longitude / Latitude / Auto-Generate */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-100 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Surname"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-100 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Default Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Default Address
          </label>
          <input
            type="text"
            placeholder="Address"
            className="w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-100 focus:ring-2 focus:ring-blue-400"
          />
        </div>
 
        {/* Phone Numbers */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number 1
          </label>
          <input
            type="number"
            placeholder="Enter your Number"
            className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number 2
          </label>
          <input
            type="number"
            placeholder="Enter your Number"
            className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* License Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            License Number
          </label>
          <input
            type="number"
            placeholder="License"
            className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* License Image Section */}
        <div className="border border-dotted border-teal-500 p-3 rounded-md">
          <label className="block text-sm font-medium text-gray-700">
            License Image
          </label>

          <div className="max-w-md mx-auto mt-3 rounded-lg overflow-hidden">
            <div className="relative h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="absolute flex flex-col items-center text-center px-4">
                <img
                  alt="File Icon"
                  className="mb-3"
                  src="https://img.icons8.com/dusk/64/000000/file.png"
                />
                <span className="text-gray-500 font-semibold">
                  Drag & drop your files here
                </span>
                <span className="text-gray-400 font-normal mt-1">
                  or click to upload
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                className="h-full w-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="button"
              className="border-2 rounded-md hover:bg-blue-500 hover:text-white border-blue-500 py-2 px-6 font-bold transition"
            >
              Upload
            </button>
          </div>

          <div className="flex justify-center mt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Uploaded Image:
              </h3>
              <img
                src="https://via.placeholder.com/200"
                alt="Uploaded Preview"
                className="rounded shadow-md w-64"
              />
            </div>
          </div>
        </div>

         {/* Vechile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Vechicle Number
          </label>
          <input
            type="string"
            placeholder="Vechicle"
            className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Vechile Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Vechicle Category
          </label>
          <input
            type="string"
            placeholder="Vechicle"
            className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Vehchile Upload */}
        <div className="border border-dotted border-indigo-500 p-3 rounded-md">
          <label className="block text-sm font-medium text-gray-700">
            Vechicle Documents (Blue Book)
          </label>

          <div className="max-w-md mx-auto mt-3 rounded-lg overflow-hidden">
            <div className="relative h-32 rounded-lg border-2 border-indigo-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="absolute flex flex-col items-center text-center px-4">
                <img
                  alt="Document Icon"
                  className="mb-3"
                  src="https://img.icons8.com/dusk/64/000000/documents.png"
                />
                <span className="text-gray-500 font-semibold">
                  Drag & drop documents here
                </span>
                <span className="text-gray-400 font-normal mt-1">
                  Accepts PDF, DOCX, JPG, PNG
                </span>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="h-full w-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="button"
              className="border-2 rounded-md hover:bg-indigo-500 hover:text-white border-indigo-500 py-2 px-6 font-bold transition"
            >
              Upload Document
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600 text-center break-all">
            Latest document uploaded:&nbsp;
            <a
              href="#"
              className="text-indigo-600 underline hover:text-indigo-800"
            >
              https://example.com/sample.pdf
            </a>
          </div>

          <div className="mt-6 space-y-3">
            <h4 className="text-base font-semibold text-gray-700">
              Uploaded Documents
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center justify-between bg-white border border-gray-200 rounded-md px-3 py-2 shadow-sm">
                <a
                  href="#"
                  className="text-indigo-600 truncate max-w-xs sm:max-w-md"
                >
                  Document 1
                </a>
                <button
                  type="button"
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
