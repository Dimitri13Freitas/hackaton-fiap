import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button, Separator, Plus } from "@repo/ui";
import { TipsSlide } from "./tips-slide";
import { usePreferencesStore } from "@repo/stores";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Configurar repositório" },
    "task-2": { id: "task-2", content: "Estilizar Sidebar" },
  },
  columns: {
    "col-1": { id: "col-1", title: "a fazer", taskIds: ["task-1", "task-2"] },
    "col-2": { id: "col-2", title: "fazendo", taskIds: [] },
    "col-3": { id: "col-3", title: "concluídas", taskIds: [] },
  },
  columnOrder: ["col-1", "col-2", "col-3"],
};

export default function KanbanBoard() {
  const focusMode = usePreferencesStore((s) => s.settings?.focusMode);
  const [data, setData] = useState(initialData);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [activeColumnId, setActiveColumnId] = useState(null);

  const handleAddTask = (e, columnId) => {
    e.preventDefault();
    if (!newTaskContent.trim()) return;

    const newTaskId = `task-${Date.now()}`;
    const newTask = { id: newTaskId, content: newTaskContent };

    const column = data.columns[columnId];
    const newColumn = {
      ...column,
      taskIds: [newTaskId, ...column.taskIds],
    };

    setData({
      ...data,
      tasks: { ...data.tasks, [newTaskId]: newTask },
      columns: { ...data.columns, [columnId]: newColumn },
    });

    setNewTaskContent("");
    setActiveColumnId(null);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newCol = { ...start, taskIds: newTaskIds };
      setData({ ...data, columns: { ...data.columns, [newCol.id]: newCol } });
      return;
    }

    const startIds = Array.from(start.taskIds);
    startIds.splice(source.index, 1);
    const finishIds = Array.from(finish.taskIds);
    finishIds.splice(destination.index, 0, draggableId);

    setData({
      ...data,
      columns: {
        ...data.columns,
        [start.id]: { ...start, taskIds: startIds },
        [finish.id]: { ...finish, taskIds: finishIds },
      },
    });
  };

  return (
    <div className="flex flex-1 gap-6 flex-col lg:flex-row h-full p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-1 gap-4 overflow-x-auto">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((id) => data.tasks[id]);

            return (
              <div
                key={column.id}
                className="flex flex-1 min-w-[280px] flex-col  rounded-xl border  bg-muted/20 p-4"
              >
                <div className="flex items-center justify-between mb-2 ">
                  <h3 className="font-bold text-sm uppercase tracking-tight">
                    {column.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="default"
                    onClick={() => {
                      setActiveColumnId(
                        activeColumnId === column.id ? null : column.id,
                      );
                      setNewTaskContent("");
                    }}
                    className="hover:bg-primary/30! p-1 h-auto rounded-md transition-colors cursor-pointer"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <Separator />

                {activeColumnId === column.id && (
                  <form
                    onSubmit={(e) => handleAddTask(e, column.id)}
                    className="mb-4 mt-3 space-y-2"
                  >
                    <input
                      autoFocus
                      className="w-full p-2 text-sm border rounded-lg bg-background focus:ring-2 ring-primary/20 outline-none"
                      placeholder="O que precisa ser feito?"
                      value={newTaskContent}
                      onChange={(e) => setNewTaskContent(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        type="submit"
                        className="text-xs py-1 rounded-md font-medium"
                      >
                        Salvar
                      </Button>
                      <button
                        type="button"
                        onClick={() => setActiveColumnId(null)}
                        className="text-xs hover:underline"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                )}

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex flex-1 mt-3 flex-col gap-2 min-h-[150px] transition-colors ${snapshot.isDraggingOver ? "bg-primary/20 rounded-md" : ""}`}
                    >
                      {tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`rounded-lg border bg-background p-3 text-sm shadow-sm hover:border-primary/50 transition-all ${
                                snapshot.isDragging
                                  ? "shadow-xl scale-[1.02] border-primary ring-2 ring-primary/10"
                                  : ""
                              }`}
                            >
                              {task.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
      {!focusMode && <TipsSlide />}

      {/* <aside className="w-full lg:w-64 shrink-0">
        <div className="rounded-xl border bg-card p-5 shadow-sm sticky top-0">
          <h3 className="mb-3 font-bold text-sm text-primary">
            Dicas de produtividade
          </h3>
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-3">
              "A técnica Pomodoro ajuda a manter o foco alto e evita o burnout
              mental."
            </p>
            <div className="h-px bg-border w-full" />
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
              Próxima dica em 05:00
            </p>
          </div>
        </div>
      </aside> */}
    </div>
  );
}
