// src/routes/index.jsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
//import ContactPage from "../pages/ContactPage";
import BlogList from "../pages/BlogList";
import BlogDetail from "../pages/BlogDetail";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/contact" element={<ContactPage />} /> */}
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
