import { useAuthStore } from "@repo/stores";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { lazy } from "react";

const RemoteMFELogin = lazy(() => import("mfe_login/Login"));
const RemoteMFERegister = lazy(() => import("mfe_login/Register"));

export function AppRoutes() {
  const { isAuthenticated } = useAuthStore();

  // if (isLoading) return <h1>Loading....</h1>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Home />
            ) : (
              <h1 className="bg-red-500">Interface logada</h1>
            )
          }
        />

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
              <h1 className="bg-red-500">Interface logada</h1>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
