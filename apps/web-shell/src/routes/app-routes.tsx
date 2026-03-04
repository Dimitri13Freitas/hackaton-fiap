import { useAuthStore } from "@repo/stores";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Home } from "../pages/home";
import { lazy, useEffect } from "react";
import { TooltipProvider } from "@repo/ui";
import { Interface } from "../pages/interface";

const RemoteMFELogin = lazy(() => import("mfe_login/Login"));
const RemoteMFERegister = lazy(() => import("mfe_login/Register"));

export function AppRoutes() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <TooltipProvider>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Interface /> : <Home />} />

        <Route
          path="/login"
          element={!isAuthenticated ? <RemoteMFELogin /> : <Navigate to="/" />}
        />

        <Route
          path="/register"
          element={
            !isAuthenticated ? <RemoteMFERegister /> : <Navigate to="/" />
          }
        />
      </Routes>
    </TooltipProvider>
  );
}
