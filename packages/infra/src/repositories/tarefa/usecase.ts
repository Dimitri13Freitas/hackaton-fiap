import { TarefaRepository } from "./TarefaRepository";
import { CriarTarefa } from "@repo/application";

const tarefaRepository = new TarefaRepository();

export const salvarTarefaUseCase = new CriarTarefa(tarefaRepository);
// export const listarTarefaUseCase = new Listar(tarefaRepository);
