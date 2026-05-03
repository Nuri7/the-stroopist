"use client";

import { useState, useEffect } from "react";
import PinLogin from "./components/PinLogin";
import AdminDashboard from "./components/AdminDashboard";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("stroopist_admin_auth");
    if (stored === "true") setAuthenticated(true);
    setChecking(false);
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem("stroopist_admin_auth", "true");
    setAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("stroopist_admin_auth");
    setAuthenticated(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#1A120D] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-caramel border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return <PinLogin onSuccess={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
