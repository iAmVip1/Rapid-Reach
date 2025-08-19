import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { FaHospital, FaTint, FaShieldAlt, FaFire } from "react-icons/fa";
import SocketContext from "../socket/SocketContext";

// Category icons
const getCategoryIconElement = (category) => {
  const normalized = (category || "").toLowerCase();
  const size = 25;
  if (normalized.includes("hospital"))
    return <FaHospital size={size} color="#d32f2f" />;
  if (normalized.includes("blood"))
    return <FaTint size={size} color="#b31217" />;
  if (normalized.includes("police"))
    return <FaShieldAlt size={size} color="#1976d2" />;
  if (normalized.includes("fire"))
    return <FaFire size={size} color="#ef6c00" />;
  return <FaHospital size={size} color="#555" />;
};

// Div icon for marker
const makeOverlayDivIcon = (category, departmentName) => {
  const iconEl = getCategoryIconElement(category);
  const html = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; white-space: nowrap;">
      <div style="width: 32px; height: 32px; border-radius: 50%; background: #fff; border: 1px solid rgba(0,0,0,0.2); box-shadow: 0 1px 2px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
        ${ReactDOMServer.renderToString(iconEl)}
      </div>
      <div style="margin-top: 4px; font-weight: 700; font-size: 12px; color: #000; text-align: center;">
        ${departmentName || ""}
      </div>
    </div>
  `;
  return L.divIcon({
    className: "",
    html,
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -48],
  });
};

// Helper component to fit map to markers around user location
function FitBounds({ userLocation }) {
  const map = useMap();
  const [initialZoomSet, setInitialZoomSet] = useState(false);

  useEffect(() => {
    if (!userLocation) return;

    const zoomLevel = 15;
    if (!initialZoomSet) {
      map.setView(userLocation, zoomLevel);
      setInitialZoomSet(true);
    } else {
      map.panTo(userLocation);
    }
  }, [userLocation, map, initialZoomSet]);

  return null;
}

export default function MapView() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [userLocation, setUserLocation] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = SocketContext.getSocket();

  // Fetch posts from API
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/get?${searchQuery}`);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLocation([lat, lng]);
        // Emit location to server so others can see us on the map
        if (socket && currentUser?._id && Number.isFinite(lat) && Number.isFinite(lng)) {
          socket.emit("location-update", {
            id: currentUser._id,
            name: currentUser.username,
            lat,
            lng,
          });
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 5000,
      }
    );

    // Cleanup on unmount
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Join the socket room and receive online users (with locations if available)
  useEffect(() => {
    if (!socket) return;
    if (currentUser?._id) {
      socket.emit("join", { id: currentUser._id, name: currentUser.username });
    }
    const handleOnlineUsers = (users) => setOnlineUsers(users || []);
    socket.on("online-users", handleOnlineUsers);
    return () => {
      socket.off("online-users", handleOnlineUsers);
    };
  }, [socket, currentUser]);

  if (loading) return <div className="text-center mt-6">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-6 text-red-500">Error loading posts</div>
    );
  // Always render the map even if there are no posts

  return (
    <div className="flex flex-col space-y-4 min-h-screen">
      <MapContainer
        zoom={13}
        minZoom={10}
        maxZoom={18}
        className="w-full z-0"
        style={{ height: "100vh", width: "100%" }} // Full height of the screen
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Render all posts as markers */}
        {posts.map((p, idx) => {
          const lat = Number(p.latitude);
          const lng = Number(p.longitude);
          if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

          const position = [lat, lng];
          const icon = makeOverlayDivIcon(p.category, p.departmentName);

          return (
            <Marker key={idx} position={position} icon={icon}>
              <Popup>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {getCategoryIconElement(p.category)}
                  <div>
                    <div style={{ fontWeight: 700 }}>{p.departmentName}</div>
                    <div style={{ fontSize: 12 }}>{p.address}</div>
                    {p.category && (
                      <div style={{ fontSize: 12, marginTop: 4 }}>
                        Category: {p.category}
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* User location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
              iconSize: [30, 30],
              iconAnchor: [15, 30],
            })}
          >
            <Tooltip direction="top" permanent>
              {currentUser?.username || "You"}
            </Tooltip>
            <Popup>
              <div style={{ fontWeight: "700" }}>You are here</div>
            </Popup>
          </Marker>
        )}

        {/* Online users markers (excluding the current user) */}
        {onlineUsers
          .filter((u) => u.userId !== currentUser?._id && Number.isFinite(u?.lat) && Number.isFinite(u?.lng))
          .map((u) => (
            <Marker
              key={u.userId}
              position={[u.lat, u.lng]}
              icon={L.icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                iconSize: [26, 26],
                iconAnchor: [13, 26],
              })}
            >
              <Tooltip direction="top" permanent>
                {u.name || "Online user"}
              </Tooltip>
              <Popup>
                <div style={{ fontWeight: 600 }}>{u.name || "Online user"}</div>
                <div style={{ fontSize: 12 }}>Online</div>
              </Popup>
            </Marker>
          ))}

        {/* Fit bounds to focus on the user location */}
        <FitBounds userLocation={userLocation} />
      </MapContainer>
    </div>
  );
}
