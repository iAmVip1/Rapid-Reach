import React, { useState } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log(currentUser?.profilePicture);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-lime-50 shadow-md">
      <nav className="border-gray-200">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-sm sm:text-xl flex items-center"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_the_Red_Cross.svg/1200px-Flag_of_the_Red_Cross.svg.png"
              alt="logo"
              className="h-8"
            />
            <span
              className="px-2 py-1 bg-gradient-to-r from-emerald-400 to-cyan-400
       rounded-lg text-white"
            >
              Rapid
            </span>
            <span>Reach</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8 cursor-pointer">
            <li
              className="hover:bg-rose-700 hover:text-white p-2 rounded-xl
            transition-colors duration-200"
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-rose-700 text-white p-2 rounded-xl"
                    : "font-medium"
                }
              >
                Home
              </NavLink>
            </li>
            <li
              className="hover:bg-rose-700 hover:text-white p-2 rounded-xl
            transition-colors duration-200"
            >
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive
                    ? "bg-rose-700 text-white p-2 rounded-xl"
                    : "font-medium"
                }
              >
                Services
              </NavLink>
            </li>
            <li
              className="hover:bg-rose-700 hover:text-white p-2 rounded-xl
            transition-colors duration-200"
            >
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "bg-rose-700 text-white p-2 rounded-xl"
                    : "font-medium"
                }
              >
                Contact Us
              </NavLink>
            </li>
            {currentUser ? (
              <>
                <button className="group relative border-none block text-gray-500 text-lg px-3 py-1 rounded sm:hidden md:block z-50">
                  <img
                    src={
                      currentUser?.profilePicture
                        ? `http://localhost:3000/${currentUser.profilePicture.replace(
                            /\\/g,
                            "/"
                          )}`
                        : "https://github.com/iAmVip1/serviceaggregator/blob/main/images/avatar.jpg?raw=true"
                    }
                    alt="profile picture"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 rounded-lg p-3 mt-1 shadow-md scale-y-0 group-hover:scale-y-100 origin-top duration-200 bg-white space-y-2 w-auto">
                    <div className="text-sm block py-2 px-4 hover:font-semibold border-b-2 border-dashed border-gray-400 last:border-0">
                      <div>{currentUser.username}</div>
                      <div className="font-medium truncate">
                        {currentUser.email}
                      </div>
                    </div>
                    <a
                      href="/dashboard?tab=profile"
                      className="block py-2 px-4 text-sm hover:font-semibold hover:bg-gray-500 hover:text-white rounded-xl"
                    >
                      Profile
                    </a>
                   
                    <div className="border-b-2 border-dashed border-gray-400 last:border-0"></div>
                    <div className="py-2">
                      <div
                        className="block px-4 py-2 text-sm hover:cursor-pointer hover:bg-red-500 hover:text-white rounded-xl"
                        onClick={handleSignout}
                      >
                        Sign out
                      </div>
                    </div>
                  </div>
                </button>
              </>
            ) : (
              <li
                className="hover:bg-rose-700 hover:text-white p-2 rounded-xl
            transition-colors duration-200"
              >
                <NavLink
                  to="/sign-in"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-rose-700 text-white p-2 rounded-xl"
                      : "font-medium"
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center space-x-4">
            {/* profilePicture */}
             {currentUser ? (
               <button
              className="group relative border-none block text-gray-500 text-lg px-3 py-1 rounded z-50"
              onClick={toggleDropdown} // Toggle dropdown on click
            >
              <img
                src={
                  currentUser?.profilePicture
                    ? `http://localhost:3000/${currentUser.profilePicture.replace(
                        /\\/g,
                        "/"
                      )}`
                    : "https://github.com/iAmVip1/serviceaggregator/blob/main/images/avatar.jpg?raw=true"
                }
                alt="profile picture"
                className="w-8 h-8 rounded-full object-cover"
              />
              {isOpen && ( // Only show the dropdown if `isOpen` is true
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 rounded-lg p-3 mt-1 shadow-md scale-y-100 origin-top duration-200 bg-white space-y-2 w-auto">
                  <div className="text-sm block py-2 px-4 hover:font-semibold border-b-2 border-dashed border-gray-400 last:border-0">
                    <div>{currentUser.username}</div>
                    <div className="font-medium truncate">
                      {currentUser.email}
                    </div>
                  </div>
                  <a
                    href="/dashboard?tab=profile"
                    className="block py-2 px-4 text-sm hover:font-semibold hover:bg-gray-500 hover:text-white rounded-xl"
                  >
                    Profile
                  </a>
                
                  <div className="border-b-2 border-dashed border-gray-400 last:border-0"></div>
                  <div className="py-2">
                    <div
                      className="block px-4 py-2 text-sm hover:cursor-pointer hover:bg-red-500 hover:text-white rounded-xl"
                      onClick={handleSignout}
                    >
                      Sign out
                    </div>
                  </div>
                </div>
              )}
            </button>
             ):(
              <></>
             )}
           

            {/* profilePicture */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-4 space-y-2 ">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-black font-medium"
                  : "block text-gray-600"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-black font-medium"
                  : "block text-gray-600"
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-black font-medium"
                  : "block text-gray-600"
              }
            >
              Contact Us
            </NavLink>
            {currentUser ? (
              <></>
            ) : (
              <NavLink
                to="/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "block text-black font-medium"
                    : "block text-gray-600"
                }
              >
                Login
              </NavLink>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
