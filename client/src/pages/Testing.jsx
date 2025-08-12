import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { FaHospital, FaTint, FaShieldAlt, FaFire } from "react-icons/fa";

// Default Leaflet marker icon (local assets via package)
const defaultIcon = L.icon({
  iconUrl: new URL(
    "leaflet/dist/images/marker-icon.png",
    import.meta.url
  ).toString(),
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).toString(),
  shadowUrl: new URL(
    "leaflet/dist/images/marker-shadow.png",
    import.meta.url
  ).toString(),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

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

const makeOverlayDivIcon = (category) => {
  const iconEl = getCategoryIconElement(category);
  const html = `
    <div style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#ffffff;border:1px solid rgba(0,0,0,0.2);box-shadow:0 1px 2px rgba(0,0,0,0.3);">
      ${ReactDOMServer.renderToString(iconEl)}
    </div>
  `;
  return L.divIcon({
    className: "",
    html,
    iconSize: [32, 32],
    iconAnchor: [16, 16], // center the icon exactly
    popupAnchor: [0, -20],
  });
};


export default function Testing() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/get/${params.postId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [params.postId]);

  const position = useMemo(() => {
    if (!post) return null;
    const lat = Number(post.latitude);
    const lng = Number(post.longitude);
    if (Number.isFinite(lat) && Number.isFinite(lng)) return [lat, lng];
    return null;
  }, [post]);

  const overlayIcon = useMemo(
    () => makeOverlayDivIcon(post?.category),
    [post?.category]
  );

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-6 text-red-500">Error loading post</div>
    );
  }

  if (!post || !position) {
    return <div className="text-center mt-6">Location unavailable</div>;
  }
console.log(post);

  return (
    <div className="">
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      {/* 5rem = ~80px, adjust to your navbar height */}
      <MapContainer
        center={position}
        zoom={15}
        className="flex-1 w-full z-0"
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
<Marker position={position} icon={overlayIcon}>
  <Popup>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {getCategoryIconElement(post.category)}
      <div>
        <div style={{ fontWeight: 700 }}>{post.departmentName}</div>
        <div style={{ fontSize: 12 }}>{post.address}</div>
        {post.category && (
          <div style={{ fontSize: 12, marginTop: 4 }}>
            Category: {post.category}
          </div>
        )}
      </div>
    </div>
  </Popup>
</Marker>


        <Marker
          position={position}
          icon={overlayIcon}
          interactive={false}
          zIndexOffset={1000}
          color="d32f2f"
        />
      </MapContainer>
    </div>
    
    </div>
  );
}
