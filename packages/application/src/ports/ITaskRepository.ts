import { Task } from "@repo/domain";

export interface ITaskRepository {
  getTasks(userId: string): Promise<Task[]>;
  createTask(userId: string, task: Task): Promise<void>;
  updateTask(userId: string, task: Task): Promise<void>;
  deleteTask(userId: string, taskId: string): Promise<void>;
}
