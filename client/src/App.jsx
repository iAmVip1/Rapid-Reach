import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Contact from "./pages/Contact";
import GridView from "./pages/GridView";
import MapView from "./pages/MapView";
import Services from "./pages/Services";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import DepartmentRoute from "./components/DepartmentRoute";
import CreatePost from "./pages/CreatePost";
import Failed from "./pages/Failed";
import Testing from "./pages/Testing";
import Post from "./pages/Post";
import Sample from "./pages/Sample";
import ScrollToTop from "./components/ScrollToTop";
import { CallProvider } from "./socket/CallContext";
import CallOverlay from "./components/CallOverlay";
import UpdatePost from "./pages/UpdatePost";

export default function App() {
  return (
    <BrowserRouter>
    <CallProvider>
    <Header />
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<PrivateRoute />} >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/not-allowed" element={<Failed />} />
        </Route>

        <Route element={<DepartmentRoute />} >
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/update-post/:postId" element={<UpdatePost />} />
        <Route path="/mapview" element={<MapView />} />
        </Route>
        
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/gridview" element={<GridView />} />
        <Route path="/services" element={<Services />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/test/:postId" element={<Testing />} />
        <Route path="/sample" element={<Sample />} />
      </Routes>
      <CallOverlay />
      <Footer />
    </CallProvider>
    </BrowserRouter>
  )
}
