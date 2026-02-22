import { Tarefa } from "@repo/domain";

export interface ITarefaRepository {
  salvar(tarefa: Tarefa): Promise<void>;
  listar(): Promise<Tarefa[]>;
}
