import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Button,
  Separator,
  Plus,
  MindEaseText,
  Input,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  MoreVertical,
  Trash,
  Pencil,
} from "@repo/ui";
import { TipsSlide } from "./tips-slide";
import { usePreferencesStore, useAuthStore } from "@repo/stores";
import {
  createTaskUseCase,
  deleteTaskUseCase,
  getTasksUseCase,
  updateTaskUseCase,
} from "@repo/infra";
import { Task } from "@repo/domain";

const DEFAULT_DATA = {
  tasks: {} as any,
  columns: {
    "col-1": { id: "col-1", title: "a fazer", taskIds: [] },
    "col-2": { id: "col-2", title: "fazendo", taskIds: [] },
    "col-3": { id: "col-3", title: "concluídas", taskIds: [] },
  } as any,
  columnOrder: ["col-1", "col-2", "col-3"],
};

export default function KanbanBoard() {
  const focusMode = usePreferencesStore((s) => s.settings?.focusMode);
  const { user } = useAuthStore();
  const [data, setData] = useState<any>(DEFAULT_DATA);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    async function loadTasks() {
      if (!user?.uid) return;
      const result = await getTasksUseCase.execute(user.uid);
      setTasks(result);

      const newTasks: any = {};
      const newColumns: any = JSON.parse(JSON.stringify(DEFAULT_DATA.columns));

      const sortedResult = Array.isArray(result)
        ? [...result].sort((a, b) => a.createAt - b.createAt)
        : [];

      sortedResult.forEach((task: any) => {
        newTasks[task.id] = task;
        if (newColumns[task.columnId]) {
          newColumns[task.columnId].taskIds.push(task.id);
        } else {
          newColumns["col-1"].taskIds.push(task.id);
        }
      });

      setData({
        tasks: newTasks,
        columns: newColumns,
        columnOrder: DEFAULT_DATA.columnOrder,
      });
    }

    loadTasks();
  }, [user?.uid]);

  const handleAddTask = async (e: any, columnId: string) => {
    e.preventDefault();
    if (!user?.uid || !newTaskContent.trim()) return;

    const task = new Task(
      crypto.randomUUID(),
      newTaskContent,
      columnId,
      Date.now(),
    );

    setData((prev: any) => {
      const column = prev.columns[columnId];
      return {
        ...prev,
        tasks: { ...prev.tasks, [task.id]: task },
        columns: {
          ...prev.columns,
          [columnId]: { ...column, taskIds: [...column.taskIds, task.id] },
        },
      };
    });
    setTasks((prev: any) => [...prev, task]);
    setNewTaskContent("");
    setActiveColumnId(null);

    await createTaskUseCase.execute(user.uid, task);
  };

  const handleDeleteTask = async (taskId: string, columnId: string) => {
    if (!user?.uid) return;

    setData((prev: any) => {
      const column = prev.columns[columnId];
      return {
        ...prev,
        columns: {
          ...prev.columns,
          [columnId]: {
            ...column,
            taskIds: column.taskIds.filter((id: string) => id !== taskId),
          },
        },
        tasks: Object.fromEntries(
          Object.entries(prev.tasks).filter(([id]) => id !== taskId),
        ),
      };
    });
    setTasks((prev: any) => prev.filter((t: any) => t.id !== taskId));

    await deleteTaskUseCase.execute(user.uid, taskId);
  };

  const handleEditTask = async (taskId: string) => {
    if (!user?.uid || !editingText.trim()) {
      setEditingTaskId(null);
      return;
    }

    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const updatedTask = new Task(
      task.id,
      editingText,
      task.columnId,
      task.createAt,
    );

    setData((prev: any) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [taskId]: { ...prev.tasks[taskId], content: editingText },
      },
    }));
    setTasks((prev: any) =>
      prev.map((t: any) => (t.id === taskId ? updatedTask : t)),
    );
    setEditingTaskId(null);

    console.log(updatedTask);

    await updateTaskUseCase.execute(user.uid, updatedTask);
  };

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination || !user?.uid) return;
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

    const task = tasks.find((t: any) => t.id === draggableId);
    if (task) {
      const updatedTask = new Task(
        task.id,
        task.content,
        destination.droppableId,
        task.createAt,
      );
      setTasks((prev: any) =>
        prev.map((t: any) => (t.id === task.id ? updatedTask : t)),
      );
      await updateTaskUseCase.execute(user.uid, updatedTask);
    }
  };

  return (
    <div className="flex flex-1 gap-6 flex-col lg:flex-row h-full p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-1 gap-4 overflow-x-auto">
          {data.columnOrder.map((columnId: string) => {
            const column = data.columns[columnId];
            const columnTasks = column.taskIds
              .map((id: string) => data.tasks[id])
              .filter(Boolean);

            return (
              <div
                key={column.id}
                className="flex flex-1 min-w-[280px] flex-col rounded-xl border bg-muted/20 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <MindEaseText
                    variant="sm"
                    className="font-bold uppercase tracking-tight"
                  >
                    {column.title}
                  </MindEaseText>
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
                    <Input
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
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setActiveColumnId(null)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                )}

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex flex-1 mt-3 flex-col gap-2 min-h-[150px] transition-colors ${
                        snapshot.isDraggingOver
                          ? "bg-primary/20 rounded-md"
                          : ""
                      }`}
                    >
                      {columnTasks.map((task: any, index: number) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`rounded-lg border bg-background p-3 text-sm shadow-sm hover:border-primary/50 transition-all ${
                                snapshot.isDragging
                                  ? "shadow-xl scale-[1.02] border-primary ring-2 ring-primary/10"
                                  : ""
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                {editingTaskId === task.id ? (
                                  <Input
                                    autoFocus
                                    value={editingText}
                                    onChange={(e) =>
                                      setEditingText(e.target.value)
                                    }
                                    onBlur={() => handleEditTask(task.id)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        handleEditTask(task.id);
                                      }
                                    }}
                                  />
                                ) : (
                                  <span
                                    {...provided.dragHandleProps}
                                    className="flex-1 cursor-grab"
                                  >
                                    {task.content}
                                  </span>
                                )}

                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <button className="p-1 rounded hover:bg-muted">
                                      <MoreVertical size={16} />
                                    </button>
                                  </DropdownMenuTrigger>

                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setEditingTaskId(task.id);
                                        setEditingText(task.content);
                                      }}
                                    >
                                      <Pencil size={14} className="mr-2" />
                                      Editar
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                      className="text-red-500"
                                      onClick={() =>
                                        handleDeleteTask(task.id, column.id)
                                      }
                                    >
                                      <Trash size={14} className="mr-2" />
                                      Excluir
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
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
    </div>
  );
}
