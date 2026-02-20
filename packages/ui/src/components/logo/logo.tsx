import React from "react";
import { Brain } from "lucide-react";
import { MindEaseText } from "../../components/text/text";

export const MindEaseLogo = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Brain size={32} />
        <MindEaseText variant="h1" className="font-semibold text-xl">
          MindEase
        </MindEaseText>
      </div>
    </div>
  );
};
