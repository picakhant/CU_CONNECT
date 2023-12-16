import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Verify from "./pages/Verify.jsx";
import ProfileSetup from "./pages/ProfileSetup.jsx";
import "./App.css";

const App = () => {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email/:token" element={<Verify />} />
        <Route path="/profile-setup/:id" element={<ProfileSetup />} />
      </Routes>
    </div>
  );
};

export default App;
