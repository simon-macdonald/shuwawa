import confetti from "canvas-confetti";
import { useEffect } from "react";

interface ConfettiBurstProps {
  trigger: boolean;
}

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({ trigger }) => {
  useEffect(() => {
    if (trigger) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [trigger]);

  return null;
};
