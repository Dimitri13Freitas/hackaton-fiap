import { Tarefa } from "../entities/Tarefa";

export interface ITarefaRepository {
  salvar(tarefa: Tarefa): Promise<void>;
  listar(): Promise<Tarefa[]>;
}
