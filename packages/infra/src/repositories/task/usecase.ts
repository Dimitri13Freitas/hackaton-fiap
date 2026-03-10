import { TaskRepository } from "./TaskRepository";
import {
  CreateTask,
  GetTasks,
  UpdateTask,
  DeleteTask,
} from "@repo/application";

const taskRepository = new TaskRepository();

export const createTaskUseCase = new CreateTask(taskRepository);
export const getTasksUseCase = new GetTasks(taskRepository);
export const updateTaskUseCase = new UpdateTask(taskRepository);
export const deleteTaskUseCase = new DeleteTask(taskRepository);
