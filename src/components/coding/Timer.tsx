"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";

interface TimerProps {
  onTimeUpdate?: (seconds: number) => void;
}

export function Timer({ onTimeUpdate }: TimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 1;
          onTimeUpdate?.(next);
          return next;
        });
      }, 1000);
    } else {
      clearTimer();
    }

    return clearTimer;
  }, [isRunning, clearTimer, onTimeUpdate]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    onTimeUpdate?.(0);
  };

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-2xl font-bold tabular-nums">
        {display}
      </span>
      <div className="flex gap-1.5">
        {!isRunning ? (
          <Button size="sm" variant="outline" onClick={handleStart}>
            Start
          </Button>
        ) : (
          <Button size="sm" variant="outline" onClick={handlePause}>
            Pause
          </Button>
        )}
        <Button size="sm" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
