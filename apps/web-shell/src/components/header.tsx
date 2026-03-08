import { MindEaseText, Separator, SidebarTrigger } from "@repo/ui";
import { PomodoroTimer } from "./pomodoro-timer";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  const routeNames: Record<string, string> = {
    "/": "Kanban",
    "/settings": "Configurações",
    "/profile": "Meu Perfil",
  };

  const currentTitle = routeNames[location.pathname] || "MindEase";

  return (
    <header className="flex py-2 h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <MindEaseText>{currentTitle}</MindEaseText>
        <div className="ml-auto flex items-center gap-2">
          <PomodoroTimer />
        </div>
      </div>
    </header>
  );
};
