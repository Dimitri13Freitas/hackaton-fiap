import { Button, MindEaseLogo, MindEaseText } from "@repo/ui";
// import { Suspense, lazy, useState } from "react";
import { Target, Zap, Sparkles } from "lucide-react";
import { AssetHome } from "../public/assethome";
import { AppRoutes } from "./routes/app-routes";

// const RemoteMFELogin = lazy(() => import("mfe_login/Login"));

// const LoadingSpinner = () => (
//   <div className="flex justify-center p-4">
//     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//   </div>
// );

export const RemoteComponentWrapper = () => {
  return <AppRoutes />;
};
