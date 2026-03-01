import { AppRoutes } from "./routes/app-routes";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@repo/ui";

export const RemoteComponentWrapper = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster richColors />
    </BrowserRouter>
  );
};
