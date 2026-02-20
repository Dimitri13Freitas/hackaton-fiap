import { TarefaRepository } from "./TarefaRepository";
import { CriarTarefa } from "@repo/domain";

const tarefaRepository = new TarefaRepository();

export const salvarTarefaUseCase = new CriarTarefa(tarefaRepository);
// export const listarTarefaUseCase = new Listar(tarefaRepository);
