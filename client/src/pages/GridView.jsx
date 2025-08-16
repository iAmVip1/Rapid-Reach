import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaStar, FaGasPump } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { data, Link, useLocation, useNavigate } from "react-router-dom";
import Carpenter from "../../../imagesForWeb/car.png";
import Electrician from "../../../imagesForWeb/elec.png";
import Plumber from "../../../imagesForWeb/serviceman.png";
import PostItem from "../components/PostItem";

export default function GridView() {
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState({
    departmentName: "",
    address: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [sortOption, setSortOption] = useState("");

  const haversineDistance = (coords1, coords2) => {
    const R = 6371; // Radius of Earth in km
    const lat1 = coords1.lat;
    const lon1 = coords1.lng;
    const lat2 = coords2.lat;
    const lon2 = coords2.lng;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in km
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const departmentNameFromUrl = urlParams.get("departmentName");
    const addressFromUrl = urlParams.get("address");
    const categoryFromUrl = urlParams.get("category");

    if (departmentNameFromUrl || addressFromUrl || categoryFromUrl) {
      setFilters({
        departmentName: departmentNameFromUrl || "",
        address: addressFromUrl || "",
        category: categoryFromUrl || "",
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      setShowMore(false);

      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/get?${searchQuery}`);
      const data = await res.json();
      console.log("Fetched posts:", data);
      if (data.data?.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }

      setPosts(data.data || []);
      setLoading(false);
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    if (filters.departmentName) {
      urlParams.set("departmentName", filters.departmentName);
    }
    if (filters.address) {
      urlParams.set("address", filters.address);
    }
    if (filters.category) {
      urlParams.set("category", filters.category);
    }
    navigate(`/gridview?${urlParams.toString()}`);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);

    if (value === "nearest") {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const sortedPosts = [...posts]
            .map((post) => {
              const distance = haversineDistance(userCoords, {
                lat: post.latitude,
                lng: post.longitude,
              });
              return { ...post, distance: distance.toFixed(2) }; // Attach distance to each post
            })
            .sort((a, b) => a.distance - b.distance); // Sort by distance

          setPosts(sortedPosts); // Update state with sorted posts
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location.");
        }
      );
    }

    if (value === "latest") {
      setPosts(
        [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    }

    if (value === "oldest") {
      setPosts(
        [...posts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Search Bar */}

      <div className="bg-white shadow-sm py-4 px-6 flex flex-wrap gap-4 justify-between max-w-7xl mx-auto mt-4 rounded-lg">
        <input
          type="text"
          id="departmentName"
          placeholder="Name"
          className="border p-2 rounded w-64"
          value={filters.departmentName}
          onChange={handleChange}
        />
        <input
          type="text"
          id="address"
          placeholder="Address"
          className="border p-2 rounded w-64"
          value={filters.address}
          onChange={handleChange}
        />

        <select className="border p-2 rounded w-56">
          <option value="">Services Status</option>
          <option value="">Available</option>
          <option value="">Unavailable</option>
        </select>

        <select
          className="border p-2 rounded w-56"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Sort By</option>
          <option value="nearest">Nearest</option>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex gap-6 mt-6">
        {/* Left Column */}
        <div className="w-1/4 space-y-6">
          {/* Map */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              Map Placeholder
            </div>
            <button className="mt-3 w-full border rounded-lg py-2">
              Show Full Map
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Filter</h2>
            </div>

            {/* Preferences */}
            <div>
              <h3 className="font-medium mb-2">Category</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                  Hospital
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  Blood Bank
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Police Department
                </span>
              </div>
            </div>

            {/* Category */}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-3/4 space-y-6">
          {/* Popular Vehicles */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-4">Best Service Provided</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Electrician Card */}
              <div className="bg-white shadow-md hover:shadow-lg cursor-pointer transition-shadow overflow-hidden rounded-lg w-full max-w-[300px] mx-auto">
                <img
                  src={Electrician}
                  alt="Electrician"
                  className="h-[320px] sm:h-[220px] w-full object-contain hover:scale-105 transition-scale duration-300"
                />
                <div className="p-3 flex flex-col gap-2 w-full text-center">
                  <p className="text-sm font-semibold w-full">Electrician</p>
                </div>
              </div>

              {/* Carpenter Card */}
              <div className="bg-white shadow-md hover:shadow-lg cursor-pointer transition-shadow overflow-hidden rounded-lg w-full max-w-[300px] mx-auto">
                <img
                  src={Carpenter}
                  alt="Carpenter"
                  className="h-[320px] sm:h-[220px] w-full object-contain hover:scale-105 transition-scale duration-300"
                />
                <div className="p-3 flex flex-col gap-2 w-full text-center">
                  <p className="text-sm font-semibold w-full">Carpenter</p>
                </div>
              </div>

              {/* Plumber Card */}
              <div className="bg-white shadow-md hover:shadow-lg cursor-pointer transition-shadow overflow-hidden rounded-lg w-full max-w-[300px] mx-auto">
                <img
                  src={Plumber}
                  alt="Plumber"
                  className="h-[320px] sm:h-[220px] w-full object-contain hover:scale-105 transition-scale duration-300"
                />
                <div className="p-3 flex flex-col gap-2 w-full text-center">
                  <p className="text-sm font-semibold w-full">Plumber</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
            {/* Other posts */}
            {!loading && posts.length === 0 && (
              <p className="text-xl ">No Users found !!</p>
            )}
            {loading && (
              <p className="text-xl text-center w-full">Loading...</p>
            )}
            {!loading &&
              posts &&
              posts.map((post) => <PostItem key={post._id} post={post} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
