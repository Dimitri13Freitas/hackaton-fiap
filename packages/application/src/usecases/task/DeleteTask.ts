import { Task } from "@repo/domain";
import { type ITaskRepository } from "../../ports/ITaskRepository";

export class DeleteTask {
  constructor(private repository: ITaskRepository) {}
  async execute(userId: string, task: string) {
    if (!userId || userId.trim().length === 0) {
      throw new Error("User é obrigatório");
    }

    return this.repository.deleteTask(userId, task);
  }
}
