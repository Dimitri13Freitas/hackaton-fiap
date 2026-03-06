import {
  AppSidebar,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui";
import KanbanBoard from "../components/kanban-board";
import { PomodoroTimer } from "../components/pomodoro-timer";
export const Interface = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex py-2 h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-base font-medium">Kanban</h1>
            <div className="ml-auto flex items-center gap-2">
              <PomodoroTimer />
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-6 overflow-hidden">
          <KanbanBoard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
