import { AppRoutes } from "./routes/app-routes";
import { BrowserRouter } from "react-router-dom";
import { Toaster, TooltipProvider } from "@repo/ui";
import { useAuthStore } from "@repo/stores";
import { authRepository } from "@repo/infra";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";

export const RemoteComponentWrapper = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const isInitialLoading = useAuthStore((s) => s.isLoading);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = authRepository.onAuthStateChanged((domainUser) => {
      setUser(domainUser);
    });
    setLoading(false);

    return () => unsubscribe();
  }, [setUser]);

  if (isInitialLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <TooltipProvider>
        <AppRoutes />
        <Toaster richColors />
      </TooltipProvider>
    </BrowserRouter>
  );
};
