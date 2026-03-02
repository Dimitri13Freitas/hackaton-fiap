import { useAuthStore } from "@repo/stores";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "../pages/home";
import { lazy, useEffect } from "react";
import { Button, TooltipProvider } from "@repo/ui";
import { Interface } from "../pages/interface";

const RemoteMFELogin = lazy(() => import("mfe_login/Login"));
const RemoteMFERegister = lazy(() => import("mfe_login/Register"));

export function AppRoutes() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <TooltipProvider>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <Home /> : <Interface />} />

        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <RemoteMFELogin />
            ) : (
              <h1 className="bg-red-500">Interface logada</h1>
            )
          }
        />

        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <RemoteMFERegister />
            ) : (
              <>
                <h1 className="bg-red-500">Interface logada</h1>
                <Button onClick={async () => logout()}> deslogar</Button>
              </>
            )
          }
        />
      </Routes>
    </TooltipProvider>
  );
}
