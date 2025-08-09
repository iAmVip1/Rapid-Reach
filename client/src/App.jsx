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

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<PrivateRoute />} >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/not-allowed" element={<Failed />} />
        </Route>

        <Route element={<DepartmentRoute />} >
        <Route path="/create-post" element={<CreatePost />} />
        </Route>
        
        <Route path="/gridview" element={<GridView />} />
        <Route path="/mapview" element={<MapView />} />
        <Route path="/services" element={<Services />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
