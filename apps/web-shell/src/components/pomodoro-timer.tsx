import React, { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button, cn, toast } from "@repo/ui";

const FOCUS_TIME = 10; // 25 min
const BREAK_TIME = 5; // 5 min

export function PomodoroTimer() {
  const [seconds, setSeconds] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setIsBreak(false);
    setSeconds(FOCUS_TIME);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      const nextModeIsBreak = !isBreak;
      setIsBreak(nextModeIsBreak);
      setSeconds(nextModeIsBreak ? BREAK_TIME : FOCUS_TIME);

      toast(nextModeIsBreak ? "Hora de descansar!" : "Hora de focar!");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, isBreak]);

  return (
    <div className="flex items-center gap-4 font-medium">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground leading-none">
        {isBreak ? "Descanso" : "Tempo de foco"}
      </span>
      <div className="flex flex-col items-end">
        <span className="text-sm font-bold tabular-nums">
          {formatTime(seconds)}
        </span>
      </div>

      <div className="flex items-center">
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleTimer}
          className="hover:bg-primary/30! rounded-full transition-colors"
          title={isActive ? "Pausar" : "Iniciar"}
        >
          {isActive ? (
            <Pause size={14} />
          ) : (
            <Play size={14} fill="currentColor" />
          )}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={resetTimer}
          disabled={!isActive}
          className={cn(
            "p-1.5 hover:bg-primary/30! rounded-full transition-colors text-muted-foreground",
            !isActive ? "opacity-0!" : null,
          )}
          title="Reiniciar"
        >
          <RotateCcw size={14} />
        </Button>
      </div>
    </div>
  );
}
