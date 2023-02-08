import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import RedirectRoute from "./auth/RedirectRoute";
import NavBar from "./components/NavBar";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupPage from "./pages/SignupPage";
import UserProfilePage from "./pages/UserProfilePage";

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <HomePage />
        <Routes>
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:passwordResetToken"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/verify/:verificationToken"
            element={<EmailVerificationPage />}
          />
          <Route element={<RedirectRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<UserProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
