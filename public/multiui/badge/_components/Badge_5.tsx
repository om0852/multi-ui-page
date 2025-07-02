import React, { useEffect, useState } from "react";

type FallingConfettiBadgeProps = {
  text: string;
  color?: string;
};

const FallingConfettiBadge: React.FC<FallingConfettiBadgeProps> = ({
  text,
  color = "bg-purple-500",
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // Example: Render 10 confetti dots
  const confetti = Array.from({ length: 10 }).map((_, i) => (
    <div
      key={i}
      className="absolute left-1/2 animate-fall"
      style={{
        left: `${10 + i * 10}%`,
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "#facc15", // yellow-400
        animationDelay: `${i * 0.2}s`,
        top: 0,
        zIndex: 0,
      }}
    />
  ));

  return (
    <div className="relative inline-block">
      <span
        className={`text-white ${color} px-4 py-2 rounded-md font-semibold relative z-10`}
      >
        {text}
      </span>
      {confetti}
    </div>
  );
};

export default FallingConfettiBadge;
