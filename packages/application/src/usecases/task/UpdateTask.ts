import { Task } from "@repo/domain";
import { type ITaskRepository } from "../../ports/ITaskRepository";

export class UpdateTask {
  constructor(private repository: ITaskRepository) {}
  async execute(userId: string, task: Task) {
    if (!userId || userId.trim().length === 0) {
      throw new Error("User é obrigatório");
    }

    if (!task || task.content.trim().length === 0) {
      throw new Error("Task é aobrigado a ter algum conteúdo");
    }
    return this.repository.updateTask(userId, task);
  }
}
