import { type ITaskRepository } from "../../ports/ITaskRepository";

export class GetTasks {
  constructor(private repository: ITaskRepository) {}

  async execute(userId: string) {
    if (!userId || userId.trim().length === 0) {
      throw new Error("User é obrigatório");
    }

    return this.repository.getTasks(userId);
  }
}
