import { MindEaseText } from "@repo/ui";
import { Suspense, lazy, useState } from "react";
import { Target, Zap, Sparkles } from "lucide-react";
import { AssetHome } from "../public/assethome";

const RemoteMFELogin = lazy(() => import("mfe_login/Login"));

const LoadingSpinner = () => (
  <div className="flex justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

export const RemoteComponentWrapper = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="max-w-5xl items-center m-auto p-4 bg-background">
        <Suspense fallback={<LoadingSpinner />}>
          <RemoteMFELogin />
        </Suspense>
        <div className="flex mt-16 justify-between items-center">
          <main className="max-w-[480] ">
            <MindEaseText
              variant="h1"
              className="text-5xl leading-tight tracking-tight"
            >
              Gerencie seu dia com{" "}
              <span className="underline-offset-2 underline underline-red-900 decoration-primary decoration-4">
                calma
              </span>{" "}
              e foco.
            </MindEaseText>
            <MindEaseText variant="lg" className="mt-8 text-muted-foreground">
              Uma interface pensada para quem busca menos ruído e mais clareza.
              Adapte tudo ao seu ritmo cognitivo.
            </MindEaseText>
            <div className="flex flex-wrap gap-4 pt-4 mt-6">
              <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm border border-border">
                <Target className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium">Modo Foco</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm border border-border">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">Alertas IA</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm border border-border">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">
                  Resumos Inteligentes
                </span>
              </div>
            </div>
          </main>
          <aside>
            <AssetHome />
          </aside>
        </div>
      </div>
      <footer className="w-full py-4 absolute bottom-0 bg-gray-100">
        <MindEaseText
          variant="sm"
          className="text-center text-muted-foreground"
        >
          Hackathon MindEase • Acessibilidade Cognitiva para o Futuro.
        </MindEaseText>
      </footer>
    </>
  );
};
