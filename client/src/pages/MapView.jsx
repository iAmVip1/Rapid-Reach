import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function MapView() {
  const navigate = useNavigate();
  const location = useLocation();

  // Current user location state
  const [userLocation, setUserLocation] = useState(null);

useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        setUserLocation({ lat: 51.505, lon: -0.09 });
      }
    );
  }, []);

  if (!userLocation) {
    return <div>Loading map...</div>;
  }

  // Filters and posts state
  const [filters, setFilters] = useState({
    departmentName: "",
    address: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [sortOption, setSortOption] = useState("");

  // Calculate Haversine distance
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

  // Fetching posts based on query parameters
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
      if (userLocation) {
        const userCoords = {
          lat: userLocation.lat,
          lng: userLocation.lon,
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
      }
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
    <div style={{ height: "100vh" }}>
      <MapContainer
        center={[userLocation.lat, userLocation.lon]}
        zoom={13}
        style={{ height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={[userLocation.lat, userLocation.lon]} icon={new L.Icon.Default()}>
          <Popup>You are here!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
