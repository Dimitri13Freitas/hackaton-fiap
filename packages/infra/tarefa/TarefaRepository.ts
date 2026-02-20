import { ITarefaRepository, Tarefa } from "@repo/domain";

export class TarefaRepository implements ITarefaRepository {
  salvar(tarefa: Tarefa): any {
    console.log("Camada de infra: salvar function");

    return tarefa;
  }

  listar(): any {
    console.log("Camada de infra: listar function ");

    return "Listou tarefas";
  }
}
