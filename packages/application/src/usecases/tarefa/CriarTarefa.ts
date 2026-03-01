import { Tarefa } from "@repo/domain";
import { type ITarefaRepository } from "../../ports/ITarefaRepository";

export class CriarTarefa {
  constructor(private repo: ITarefaRepository) {}

  async execute(titulo: string) {
    const tarefa = new Tarefa(crypto.randomUUID(), titulo, false);
    await this.repo.salvar(tarefa);
    return tarefa;
  }
}
