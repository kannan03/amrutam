import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorSlot from "./pages/DoctorSlot";
import Appointment from "./pages/Appointment";
import Layout from "./pages/Layout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Redirect root "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected layout with logout link */}
        <Route element={<Layout />}>
          <Route path="/slots" element={<DoctorSlot />} />
          <Route path="/appointments" element={<Appointment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
