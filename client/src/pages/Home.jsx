import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState({
    departmentName: "",
    address: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  // Haversine formula to calculate distance (in KM)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Fetch posts when query params change
  useEffect(() => {
    console.log("Current search params string:", location.search);
    const urlParams = new URLSearchParams(location.search);

    const queryObject = Object.fromEntries(urlParams.entries());
    console.log("Parsed query params:", queryObject);

    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(`/api/post/get?${urlParams.toString()}`);
      const data = await res.json();
      console.log("Fetched posts:", data);
      setPosts(data.data || []);
      setLoading(false);
    };

    fetchPosts();
  }, [location.search]);

  // Handle input changes
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Submit search
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
    navigate(`/?${urlParams.toString()}`);
  };

  // "Near Me" button handler
  const handleNearMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        console.log("User location:", userLat, userLon);

        // Sort posts by distance
        const sortedPosts = [...posts].sort((a, b) => {
          const distA = getDistance(userLat, userLon, a.latitude, a.longitude);
          const distB = getDistance(userLat, userLon, b.latitude, b.longitude);
          return distA - distB; // nearest first
        });

        // Attach distance to each post for display
        const postsWithDistance = sortedPosts.map((p) => ({
          ...p,
          distance: getDistance(userLat, userLon, p.latitude, p.longitude).toFixed(2),
        }));

        setPosts(postsWithDistance);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location");
      }
    );
  };

  return (
    <div className="min-h-screen">
      <h2>Search Posts</h2>

      {/* Search Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="departmentName"
          placeholder="Department Name"
          value={filters.departmentName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={filters.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={filters.category}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
        <button
          type="button"
          style={{ backgroundColor: "blue", color: "white", marginLeft: "10px" }}
          onClick={handleNearMe}
        >
          Near Me
        </button>
      </form>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Search Results */}
      {posts.map((post) => (
        <div
          key={post._id}
          style={{ borderBottom: "1px solid #ccc", padding: "10px" }}
        >
          <h3>{post.departmentName}</h3>
          <p>{post.address}</p>
          <p>{post.category}</p>
          {post.distance && <p>Distance: {post.distance} km</p>}
        </div>
      ))}
    </div>
  );
}
