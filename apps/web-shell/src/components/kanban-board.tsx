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
  const { user } = useAuthStore();
  const [data, setData] = useState(initialData);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [activeColumnId, setActiveColumnId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [tasks, setTasks] = useState<any>([]);

  useEffect(() => {
    async function loadTasks() {
      if (!user?.uid) return null;
      const result = await getTasksUseCase.execute(user?.uid);
      console.log(result);
      setTasks(result);
    }

    loadTasks();
  }, []);

  // const handleAddTask = (e: any, columnId: any) => {
  //   e.preventDefault();
  //   if (!newTaskContent.trim()) return;

  //   const newTaskId = `task-${Date.now()}`;
  //   const newTask = { id: newTaskId, content: newTaskContent };

  //   const column = data.columns[columnId];
  //   const newColumn = {
  //     ...column,
  //     taskIds: [newTaskId, ...column.taskIds],
  //   };

  //   setData({
  //     ...data,
  //     tasks: { ...data.tasks, [newTaskId]: newTask },
  //     columns: { ...data.columns, [columnId]: newColumn },
  //   });

  //   setNewTaskContent("");
  //   setActiveColumnId(null);
  // };

  const handleAddTask = async (e, columnId) => {
    e.preventDefault();
    if (!user?.uid) return null;

    // const task = new Task(
    //   crypto.randomUUID(),
    //   newTaskContent,
    //   columnId,
    //   Date.now(),
    // );

    await createTaskUseCase.execute(user?.uid, task);

    setNewTaskContent("");
  };

  // const deleteTask = (taskId, columnId) => {
  //   const column = data.columns[columnId];

  //   const newTaskIds = column.taskIds.filter((id) => id !== taskId);

  //   const newColumn = {
  //     ...column,
  //     taskIds: newTaskIds,
  //   };

  //   const newTasks = { ...data.tasks };
  //   delete newTasks[taskId];

  //   setData({
  //     ...data,
  //     tasks: newTasks,
  //     columns: {
  //       ...data.columns,
  //       [columnId]: newColumn,
  //     },
  //   });
  // };

  // const editTask = (taskId, newContent) => {
  //   setData({
  //     ...data,
  //     tasks: {
  //       ...data.tasks,
  //       [taskId]: {
  //         ...data.tasks[taskId],
  //         content: newContent,
  //       },
  //     },
  //   });
  // };

  const handleDeleteTask = async (taskId) => {
    if (!user?.uid) return null;

    await deleteTaskUseCase.execute(user.uid, taskId);
  };

  const editTask = async (taskId, newContent) => {
    if (!user?.uid) return null;

    const task = tasks.find((t) => t.id === taskId);

    // const updated = new Task(
    //   task.id,
    //   newContent,
    //   task.columnId,
    //   task.createdAt
    // );

    await updateTaskUseCase.execute(user?.uid, updated);
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
                                    onBlur={() => {
                                      editTask(task.id, editingText);
                                      setEditingTaskId(null);
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        editTask(task.id, editingText);
                                        setEditingTaskId(null);
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
                                        deleteTask(task.id, column.id)
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
