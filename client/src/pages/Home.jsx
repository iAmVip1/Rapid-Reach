import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import MobileSidebar from "../components/MobileSidebar";
import ShowMap from "../components/ShowMap";


export default function Home() {
  
  return (
    <div className="min-h-screen flex ">
      {/* Desktop Sidebar */}
      <div className="">
        <MobileSidebar />
      </div>


      {/* Main Content */}
      <div className="flex-1">
       
    <ShowMap />
       
      </div>
    </div>
  );
}
