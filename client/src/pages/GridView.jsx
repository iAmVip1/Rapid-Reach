import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaStar, FaGasPump } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Carpenter from '../../../imagesForWeb/car.png'
import Electrician from '../../../imagesForWeb/elec.png'
import Plumber from '../../../imagesForWeb/serviceman.png'


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
    if (filters.departmentName)
      urlParams.set("departmentName", filters.departmentName);
    if (filters.address) urlParams.set("address", filters.address);
    if (filters.category) urlParams.set("category", filters.category);

    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreClick = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/get-all?${searchQuery}`);
    const data = await res.json();
    if (data.data?.length < 9) {
      setShowMore(false);
    }
    setPosts([...posts, ...(data.data || [])]);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Search Bar */}

      <div className="bg-white shadow-sm py-4 px-6 flex flex-wrap gap-4 justify-between max-w-7xl mx-auto mt-4 rounded-lg">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-64"
        />
        <select
          className="border p-2 rounded w-56"
        >
          <option value="">Services Status</option>
          <option value="">Available</option>
          <option value="">Unavailable</option>
        </select>

        <select
          className="border p-2 rounded w-56"
        >
           <option value="">Sort By</option>
          <option value="">Nearest</option>
          <option value="">Latest</option>
          <option value="">Oldest</option>
        </select>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
          Search a Car
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
              <h3 className="font-medium mb-2">Preferences</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                  Instant Rent
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  Delivery
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Pickup by Host
                </span>
              </div>
            </div>

            {/* Category */}
            <div>
              <h3 className="font-medium mb-2">Category</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>Sedan</span>
                <span>SUV</span>
                <span>Cabriolet</span>
                <span>Hatchback</span>
                <span>Wagon</span>
                <span>Pickup</span>
              </div>
            </div>
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


          {/* Other Cars */}
          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            {[1, 2, 3].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src="https://via.placeholder.com/120"
                    alt="Car"
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">2020 - Toyota Innova</h3>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <FaGasPump /> Gas
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaStar className="text-yellow-500 mr-1" /> 4.0 (180 reviews)
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Basic price from</p>
                  <p className="font-semibold">USD 380 / day</p>
                  <button className="mt-2 px-3 py-1 bg-purple-600 text-white rounded-lg">
                    Choose this car
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
