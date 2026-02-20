import { Button, MindEaseLogo } from "@repo/ui";
import React from "react";

const Login: React.FC = () => {
  return (
    <div className="flex justify-between mt-10">
      <MindEaseLogo />
      <div className="flex gap-4 items-center">
        <Button onClick={() => console.log("botão do mfe")} variant="ghost">
          Entrar
        </Button>
        <Button onClick={() => console.log("botão do mfe")} variant="default">
          Começar agora
        </Button>
      </div>
    </div>
  );
};

export default Login;
