
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TimerProps {
  seconds: number;
  onTimerEnd?: () => void;
  delay?: number;
}

const Timer: React.FC<TimerProps> = ({ seconds, onTimerEnd, delay = 0 }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout>;
    
    if (delay > 0) {
      delayTimer = setTimeout(() => {
        setTimeLeft(seconds);
        setIsActive(true);
      }, delay * 1000);
    } else {
      setTimeLeft(seconds);
      setIsActive(true);
    }
    
    return () => {
      clearTimeout(delayTimer);
    };
  }, [seconds, delay]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isActive && timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setIsAnimating(true);
        
        setTimeout(() => {
          setIsAnimating(false);
          setTimeLeft((prevTime) => (prevTime !== null ? prevTime - 1 : null));
        }, 900); // Slightly less than the interval to ensure animation completes
        
      }, 1000);
    } else if (timeLeft === 0) {
      onTimerEnd && onTimerEnd();
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [isActive, timeLeft, onTimerEnd]);

  if (timeLeft === null) return null;

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm mb-1 font-medium">الوقت المتبقي</div>
      <div 
        className={cn(
          "text-4xl font-bold bg-white/80 w-16 h-16 flex items-center justify-center rounded-full transition-all duration-300",
          isAnimating && "animate-countdown text-red-500",
          timeLeft <= 5 ? "text-red-600" : timeLeft <= 10 ? "text-orange-500" : "text-green-600"
        )}
      >
        {timeLeft}
      </div>
    </div>
  );
};

export default Timer;
