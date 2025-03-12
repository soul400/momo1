
import React, { useEffect, useState } from "react";
import { Car } from "lucide-react";

interface CarAnimationProps {
  onAnimationEnd?: () => void;
}

const CarAnimation: React.FC<CarAnimationProps> = ({ onAnimationEnd }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onAnimationEnd && onAnimationEnd();
    }, 2000); // Animation duration

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="w-full overflow-hidden">
        <Car className="animate-car-drive text-red-600 h-16 w-16 md:h-24 md:w-24" />
      </div>
    </div>
  );
};

export default CarAnimation;
