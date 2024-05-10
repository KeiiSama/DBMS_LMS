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
import { adminRoutes, customerRoutes } from "./routes";
import { Fragment } from "react";

function App() {
  const isNotAdminRoute = (path) => {
    return !adminRoutes.some((route) => route.path === path);
  };

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          {isNotAdminRoute(window.location.pathname) && <Navbar />}
          <Routes>
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/OurBook" element={<MainFood />} />
            <Route path="/About" element={<About />} />
            {[...adminRoutes, ...customerRoutes].map((item, index) => {
              let Page = item.component;
              let Layout = Fragment;
              if (item.layout) {
                Layout = item.layout;
              }
              return (
                <Route
                  key={index}
                  path={item.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
          <ToastContainer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
