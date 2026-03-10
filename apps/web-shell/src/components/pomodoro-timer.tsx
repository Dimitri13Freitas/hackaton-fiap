import { useState, useEffect, useCallback } from "react";
import { Button, cn, toast, Play, Pause, RotateCcw } from "@repo/ui";
import { usePreferencesStore } from "@repo/stores";

export function PomodoroTimer() {
  const settings = usePreferencesStore((s) => s.settings?.pomodoro);
  const focusMin = (settings?.focusMinutes ?? 10) * 60;
  const breakMin = (settings?.breakMinutes ?? 5) * 60;
  const [seconds, setSeconds] = useState(focusMin);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setSeconds(isBreak ? breakMin : focusMin);
    }
  }, [focusMin, breakMin, isBreak, isActive]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setIsBreak(false);
    setSeconds(focusMin);
  }, [focusMin]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev > 1) return prev - 1;

          const nextIsBreak = !isBreak;
          setIsBreak(nextIsBreak);

          toast(nextIsBreak ? "Hora de descansar!" : "Hora de focar!");

          return nextIsBreak ? breakMin : focusMin;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isBreak, focusMin, breakMin]);

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
