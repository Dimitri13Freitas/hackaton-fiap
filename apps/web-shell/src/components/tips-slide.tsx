import { useState, useEffect } from "react";

const dicas = [
  "A técnica Pomodoro ajuda a manter o foco alto e evita o burnout mental.",
  "Organizar tarefas por prioridade economiza energia cognitiva.",
  "Faça pausas curtas para manter a criatividade em alta.",
  "Elimine distrações digitais para sessões de trabalho profundas.",
  "Divida grandes projetos em tarefas menores e gerenciáveis.",
  "A clareza mental começa quando você coloca tudo o que precisa fazer no papel.",
  "Aprenda a dizer 'não' para tarefas que não estão alinhadas com suas prioridades.",
  "A consistência supera a intensidade quando o assunto é alcançar metas a longo prazo.",
  "Revise o seu dia anterior para começar a manhã com um plano de ação claro.",
  "O ambiente de trabalho organizado reflete diretamente na sua capacidade de foco.",
  "Evite o multitarefa; o cérebro humano funciona melhor quando foca em um ponto só.",
  "Celebre pequenas vitórias ao final de cada dia para manter a motivação em alta.",
  "Respeite o seu ritmo biológico ao distribuir as tarefas mais difíceis no seu pico de energia.",
  "A qualidade do seu descanso é tão importante quanto a qualidade do seu trabalho.",
];

export const TipsSlide = () => {
  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % dicas.length);
      setKey((prev) => prev + 1);
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="rounded-xl border bg-card p-5 shadow-sm sticky top-0 overflow-hidden">
        <h3 className="mb-2 font-bold text-sm text-primary">
          Dicas de produtividade
        </h3>
        <div className="min-h-[80px] flex items-center">
          <p
            key={index}
            className="text-xs text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-3 animate-fade-slide"
          >
            "{dicas[index]}"
          </p>
        </div>

        <div className="w-full mt-2 h-1 bg-muted rounded-full mb-4 overflow-hidden">
          <div key={key} className="h-full bg-primary animate-progress" />
        </div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
          Próxima dica em 30s
        </p>
      </div>
    </aside>
  );
};
