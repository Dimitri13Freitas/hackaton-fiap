import { AppRoutes } from "./routes/app-routes";
import { BrowserRouter } from "react-router-dom";
import { Toaster, TooltipProvider } from "@repo/ui";

export const RemoteComponentWrapper = () => {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <AppRoutes />
        <Toaster richColors />
      </TooltipProvider>
    </BrowserRouter>
  );
};
