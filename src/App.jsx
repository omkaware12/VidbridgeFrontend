
import React from "react";
import {Router ,Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp"
import AboutUs from "./pages/AboutUs";
import PricingPage from "./pages/PricingPage";
import Login from "./components/login/login"
import Otp from "./components/otp/otp"
import Dashboard from "./components/Dashboard/dashboard"
import PrivateRoute from "./components/privateRouteshandler";
import CreateProjectForm from "./components/Dashboard/projectCreation";
function App() {
  
  return (
  
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace/>}/>
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/verifyotp" element={ <Otp/>}/>
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
    </Routes>
  
  );
}

export default App;
