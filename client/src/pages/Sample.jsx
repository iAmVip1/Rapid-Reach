export default function ApplicationFormUI() {
  return (
    <main className="p-3 max-w-4xl mx-auto min-h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold text-center my-7 text-gray-800">
        Documents and Details
      </h1>

      <form className="flex flex-col sm:flex-row gap-6 bg-white shadow-lg rounded-2xl p-6">
        {/* Left Side */}
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="text"
            placeholder="Address"
            className="border border-gray-300 p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="number"
            placeholder="Contact Number"
            className="border border-gray-300 p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="number"
            placeholder="Contact Number 2"
            className="border border-gray-300 p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="number"
            placeholder="Experience (Years)"
            className="border border-gray-300 p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-cyan-500"
          />

          <label className="font-bold text-gray-800 bg-amber-400 rounded-3xl text-center py-2 mt-2">
            Work Type
          </label>

          <div className="flex gap-6 flex-wrap">
            {["Plumber", "Carpenter", "Electrician", "Maid", "Water Supply", "Laundry Man"].map(
              (job) => (
                <label key={job} className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5 accent-cyan-600" />
                  <span className="text-gray-700">{job}</span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold text-gray-800">
            Images:
            <span className="font-normal text-gray-500 ml-2">
              Please upload your certificates or license
            </span>
          </p>

          <div className="flex gap-3 items-center">
            <input
              type="file"
              accept="image/*"
              className="p-1 border border-gray-300 rounded w-full text-gray-600"
            />
            <button
              type="button"
              className="p-2 text-green-600 border border-green-600 rounded uppercase hover:bg-green-100 transition"
            >
              Upload
            </button>
          </div>

          {/* Uploaded Image Example */}
          <div className="flex justify-between p-3 border rounded-lg items-center">
            <img
              src="https://via.placeholder.com/80"
              alt="application"
              className="w-20 h-20 object-contain rounded-lg"
            />
            <button
              type="button"
              className="p-2 text-red-600 rounded-lg uppercase hover:bg-red-100 transition"
            >
              Delete
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white p-3 rounded-md 
                       font-semibold hover:shadow-lg transition duration-200"
          >
            Submit
          </button>

          {/* Error Message Example */}
          {/* <p className="text-red-600 text-sm">Error message here</p> */}
        </div>
      </form>
    </main>
  );
}
