import * as React from "react";
import { Settings, SquareKanban, User } from "lucide-react";

import { NavProjects } from "../components/nav-projects";
import { NavUser } from "../components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar";
import { MindEaseLogo } from "../components/logo/logo";

const data = {
  projects: [
    {
      name: "Kanban",
      url: "#",
      icon: SquareKanban,
    },
    {
      name: "Configurações",
      url: "#",
      icon: Settings,
    },
    {
      name: "Perfil",
      url: "#",
      icon: User,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <MindEaseLogo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
