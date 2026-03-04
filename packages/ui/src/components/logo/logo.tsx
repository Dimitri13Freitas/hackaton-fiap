import { Brain } from "lucide-react";
import { MindEaseText } from "../../components/text/text";

export const MindEaseLogo = ({ size = 32 }: { size?: number }) => {
  return (
    <div className="flex items-center gap-2 px-8 py-6 ">
      <Brain size={size} />
      <MindEaseText variant="h1" className="font-semibold text-2xl">
        MindEase
      </MindEaseText>
    </div>
  );
};
