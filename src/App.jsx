import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";   // ✅ Import toaster
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
import PricingPage from "./pages/PricingPage";
import Login from "./components/login/login";
import Otp from "./components/otp/otp";
import Dashboard from "./components/Dashboard/dashboard";
import PrivateRoute from "./components/privateRouteshandler";
import CreateProjectForm from "./components/Dashboard/projectCreation";
import UpdateProject from "./components/Dashboard/Updateproject";

// import Home from "./landingpage/home";
function App() {
  return (
    <>
     <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyotp" element={<Otp />} />
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/createProject"
          element={
            <PrivateRoute>
              <CreateProjectForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/Updateproject/:id"
          element={
            <PrivateRoute>
              <UpdateProject />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}


export default App;
