import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar";
import SlidingImage from "./Components/SlidingImage";
import OurDelivery from "./Components/OurDelivery";
import Footer from "./Components/Footer";
import CategoryProduct from "./Components/CategoryProduct";
import FoodCategory from "./Components/FoodCategory";
import Ourfood from "./Components/OurFood";
import OurFood from "./Components/OurFood";
import MainFood from "./Components/MainFood";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/OurFood" element={<MainFood />} />
            <Route path="/About" element={<About />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
