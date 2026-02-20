import { Tarefa } from "../entities/Tarefa";
import { ITarefaRepository } from "../repositories/ITarefaRepository";

export class CriarTarefa {
  constructor(private repo: ITarefaRepository) {}

  async execute(titulo: string) {
    const tarefa = new Tarefa(crypto.randomUUID(), titulo, false);
    await this.repo.salvar(tarefa);
    return tarefa;
  }
}
