import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashSideMobile from "../components/DashSideMobile";
import { FaBars } from "react-icons/fa";
import DashDocuments from "../components/DashDocuments";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState(" ");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex ">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <DashSidebar />
      </div>

      {/* Mobile Sidebar */}
      <DashSideMobile
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 p-4 relative">
        {/* Mobile Hamburger Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="text-2xl text-black"
          >
            <FaBars />
          </button>
        </div>

        {/* Render Tab Content */}
        {tab === "profile" && <DashProfile />}

        {tab === "documents" && <DashDocuments />}
        {/* Add other tab checks here */}
      </div>
    </div>
  );
}
