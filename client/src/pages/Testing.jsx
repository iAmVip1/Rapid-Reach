import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { FaHospital, FaTint, FaShieldAlt, FaFire } from "react-icons/fa";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import StarRating from "../components/StarRating";

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

// Create a pointed (teardrop) marker with the FA icon inside
const makePointedDivIcon = (category) => {
  const iconEl = getCategoryIconElement(category);
  const html = `
    <div style="position: relative; width: 40px; height: 40px;">
      <div style="position:absolute; inset:0; background:#ffffff; border:1px solid rgba(0,0,0,0.25); box-shadow:0 2px 4px rgba(0,0,0,0.35); border-radius:50% 50% 50% 0; transform: rotate(-45deg);">
        <div style="position:absolute; top:50%; left:50%; transform: translate(-50%, -50%) rotate(45deg); display:flex; align-items:center; justify-content:center; width:26px; height:26px; border-radius:50%;">
          ${ReactDOMServer.renderToString(iconEl)}
        </div>
      </div>
    </div>
  `;
  return L.divIcon({
    className: "",
    html,
    iconSize: [40, 40],
    iconAnchor: [20, 40], // point the tip to the exact location
    popupAnchor: [0, -34],
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

  const pointedIcon = useMemo(
    () => makePointedDivIcon(post?.category),
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

  const makeOverlayDivIcon = (category, departmentName) => {
  const iconEl = getCategoryIconElement(category);
  // Compose HTML for icon + label below
  const html = `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
    ">
      <div style="
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #ffffff;
        border: 1px solid rgba(0,0,0,0.2);
        box-shadow: 0 1px 2px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        ${ReactDOMServer.renderToString(iconEl)}
      </div>
      <div style="
        margin-top: 4px;
        font-weight: 700;
        font-size: 12px;
        color: #000;
        text-align: center;
      ">
        ${departmentName || ""}
      </div>
    </div>
  `;

  return L.divIcon({
    className: "",
    html,
    iconSize: [32, 48], // extra height for label
    iconAnchor: [16, 48], // bottom center aligns to location
    popupAnchor: [0, -48], // popup sits above marker+label
  });
};



  
console.log(post);

  return (
    <div className="min-h-screen">
    <div className="flex flex-col space-y-4">
      {/* 5rem = ~80px, adjust to your navbar height */}
      <MapContainer
        center={position}
        zoom={15}
        className="w-full z-0 border border-gray-400"
          style={{ height: "400px" }} // Reduce the height as per your requirement
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
<Marker position={position} icon={pointedIcon}>
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
          icon={pointedIcon}
          interactive={false}
          zIndexOffset={1000}
          color="d32f2f"
        />
      </MapContainer>
    </div>
     {/* Details Section */}
        <div className="flex justify-center ">
          <div className="flex flex-col md:flex-row items-start justify-between w-full max-w-7xl p-8 bg-white rounded-2xl gap-8">
            {/* Left Section */}
            <div className="flex items-start gap-6">
              {/* Logo */}
              <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                <img
                  src={post.imageUrls}
                  className="text-sm font-semibold text-blue-600"
                />
              </div>

              {/* Department Info */}
              <div className="flex flex-col gap-4">
                <div className="text-2xl font-bold text-gray-800">
                  {post.departmentName}
                </div>

                {/* Call Now */}
                <div className="flex items-center gap-2 text-gray-700">
                  <MdCall className="text-blue-500 text-lg" />
                  <span className="hover:underline cursor-pointer">
                    {post.phoneNumber1}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-700">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <span>{post.address}</span>
                </div>

                {/* Mobile view */}
                <div className="md:hidden">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaEnvelope className="text-gray-600" />
                    <span className="hover:underline cursor-pointer">
                      {post.userMail}
                    </span>
                  </div>

                  {/* Contact No */}
                  <div className="flex items-center gap-2 text-gray-700 mt-2">
                    <FaPhoneAlt className="text-blue-500" />
                    <span>{post.phoneNumber2}</span>
                  </div>
                </div>

                <div className="flex items-center ">
                  <div className="p-4 bg-white rounded ">
                    <h1 className="text-2xl font-bold mb-4">Rate Us</h1>
                    <StarRating totalStars={5} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="hidden sm:block md:flex md:flex-col md:items-start md:gap-6 md:mt-6">
              {/* Email */}
              <div className="flex items-center gap-2 text-gray-700">
                <FaEnvelope className="text-gray-600" />
                <span className="hover:underline cursor-pointer">
                  {post.userMail}
                </span>
              </div>

              {/* Contact No */}
              <div className="flex items-center gap-2 text-gray-700">
                <FaPhoneAlt className="text-blue-500" />
                <span>{post.phoneNumber2}</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}