import React from "react";

interface BlurBadgeProps {
  text: string;
  color?: string;
}

export default function BlurBadge({
  text,
  color = "bg-orange-500",
}: BlurBadgeProps) {
  return (
    <div
      className={`inline-block px-4 py-2 text-white font-semibold rounded-lg ${color} hover:blur-[1px] hover:scale-110 transition-all duration-300 cursor-pointer`}
    >
      {text}
    </div>
  );
}