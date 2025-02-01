import { ToastContainer } from "react-toastify";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./store/useAuthStore";
import {
  Login,
  Register,
  Home,
  ForgotPassword,
  OTP,
  ResetPassword,
} from "./pages/index.js";
import { useEffect } from "react";

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/forget-password"
          element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/" />}
        />
        <Route
          path="/verify-otp"
          element={!isAuthenticated ? <OTP /> : <Navigate to="/" />}
        />
        <Route
          path="/reset-password"
          element={!isAuthenticated ? <ResetPassword /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
