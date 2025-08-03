import { useSelector } from "react-redux";


export default function DashProfile() {
    const { currentUser, error } = useSelector((state) => state.user);

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Informations</h2>
      
      <div className="flex items-center gap-4 mb-6">
        <img
          src={
                    currentUser?.profilePicture
                      ? `http://localhost:3000/${currentUser.profilePicture.replace(
                          /\\/g,
                          "/"
                        )}`
                      : "https://via.placeholder.com/40"
                  }
                  alt="profile picture"
          className="w-20 h-20 rounded-full object-cover border-4 border-gray-300"
        />
        <div>
          <h3 className="text-lg font-bold text-gray-700">{currentUser.username}</h3>
          <div className="mt-2 flex gap-2">
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Upload New Picture
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            id="username"
            placeholder="username"
            defaultValue={currentUser.username}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            placeholder="email"
            defaultValue={currentUser.email}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <button className="w-full bg-emerald-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 transition">
        Update
      </button>

      <button className="w-full bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 transition mt-6">
        Delete
      </button>
    </div>
  );
}
