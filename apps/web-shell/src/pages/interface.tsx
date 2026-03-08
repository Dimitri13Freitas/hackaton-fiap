import { AppSidebar, SidebarInset, SidebarProvider } from "@repo/ui";
import { Header } from "../components/header";
import { Outlet } from "react-router-dom";
export const Interface = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-6 overflow-hidden">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
