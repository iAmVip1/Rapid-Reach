import { Link, useNavigate } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { FiUpload } from "react-icons/fi";

export default function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">Create an account</h2>
        <p className="text-center text-gray-600 mb-6">Please enter your valid details.</p>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center">
              {/* Main icon */}
              <CiUser className='items-center justify-center text-4xl' />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
              {/* Sub icon */}
              <FiUpload className='text-white' />
            </div>
          </div>
        </div>

        {/* Form */}
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" placeholder="Username" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" placeholder="user@example.com" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" placeholder="Must be 8 characters" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
          </div>
          <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-colors">Sign Up</button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to={"/sign-in"}>
          <div className="text-orange-500 font-medium hover:underline">Login</div>
          </Link>
        </p>
      </div>
    </div>
  );
}
