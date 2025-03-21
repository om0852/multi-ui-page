"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

type DrawerProps = { children: React.ReactNode; className?: string };
type DrawerTriggerProps = { children: React.ReactNode; onClick: () => void; className?: string };
type DrawerContentProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right" | "top" | "bottom";
  className?: string;
};

export function Drawer({ children, className }: DrawerProps) {
  return <div className={clsx("relative z-50", className)}>{children}</div>;
}

export function DrawerTrigger({ children, onClick, className }: DrawerTriggerProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        "relative py-3 px-6 rounded-lg",
        "bg-black",
        "text-white font-medium",
        "border border-transparent",
        "shadow-[0_0_20px_rgba(255,255,255,0.3)]",
        "hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]",
        "overflow-hidden",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-red-500 before:via-purple-500 before:to-blue-500",
        "before:animate-[gradient_3s_linear_infinite]",
        "before:bg-[length:200%_200%]",
        "after:absolute after:inset-[2px]",
        "after:bg-black after:rounded-lg",
        "transition-all duration-300",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

export function DrawerContent({
  children,
  isOpen,
  onClose,
  position = "right",
  className,
}: DrawerContentProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, x: position === "right" ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: position === "right" ? 100 : -100 }}
            className={clsx(
              "fixed p-6",
              "bg-black",
              "border border-transparent",
              "shadow-[0_0_30px_rgba(255,255,255,0.3)]",
              "overflow-hidden",
              {
                "left-0 top-0 bottom-0 w-96": position === "left",
                "right-0 top-0 bottom-0 w-96": position === "right",
                "top-0 left-0 right-0 h-96": position === "top",
                "bottom-0 left-0 right-0 h-auto": position === "bottom",
              },
              className
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 animate-[gradient_3s_linear_infinite] bg-[length:200%_200%] opacity-50" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative h-full text-white z-10">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 