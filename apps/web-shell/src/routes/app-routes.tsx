import { useAuthStore } from "@repo/stores";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Home } from "../pages/home";
import { lazy, useEffect } from "react";
import { TooltipProvider, PreferencesProvider } from "@repo/ui";
import { Interface } from "../pages/interface";
import KanbanBoard from "../components/kanban-board";

const RemoteMFELogin = lazy(() => import("mfe_login/Login"));
const RemoteMFERegister = lazy(() => import("mfe_login/Register"));
const RemoteMFESettings = lazy(() => import("mfe_settings/Settings"));

export function AppRoutes() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <TooltipProvider>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <PreferencesProvider>
                <Interface />
              </PreferencesProvider>
            ) : (
              <Home />
            )
          }
        >
          <Route index path="/" element={<KanbanBoard />} />
          <Route path="/settings" element={<RemoteMFESettings />} />
          <Route path="/profile" element={<div>Tela de Perfil</div>} />
        </Route>

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
