"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const animationStyles = {
  powerUp: {
    initial: { scale: 0, rotate: 180, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    exit: { scale: 0, rotate: -180, opacity: 0 },
    transition: { type: "spring", damping: 12 }
  },
  levelUp: {
    initial: { y: 100, opacity: 0, scale: 0.3 },
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: { y: -100, opacity: 0, scale: 0.3 },
    transition: { type: "spring", bounce: 0.5 }
  },
  gameOver: {
    initial: { scale: 2, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
    transition: { type: "spring", damping: 15 }
  },
  combo: {
    initial: { x: -300, rotate: -45, opacity: 0 },
    animate: { x: 0, rotate: 0, opacity: 1 },
    exit: { x: 300, rotate: 45, opacity: 0 },
    transition: { type: "spring", damping: 20 }
  }
};

type DialogProps = {
  children: React.ReactNode;
  className?: string;
};

type DialogTriggerProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};

type DialogContentProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  animationType: keyof typeof animationStyles;
  className?: string;
};

type DialogHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

type DialogDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

type DialogFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export function StyledDialog({ children, className }: DialogProps) {
  return <div className={`relative z-50 ${className || ""}`}>{children}</div>;
}

export function StyledDialogContent({
  children,
  isOpen,
  onClose,
  animationType,
  className,
}: DialogContentProps) {
  const animation = animationStyles[animationType];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-[2px] z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <motion.div
              {...animation}
              className={`relative bg-[#1a1b2e] border-4 border-[#4a5568] rounded-lg
                p-4 sm:p-8 w-full max-w-[90%] sm:max-w-md md:max-w-lg shadow-[0_0_20px_rgba(66,153,225,0.5)]
                [image-rendering:pixelated] overflow-y-auto max-h-[90vh] ${className || ""}`}
            >
              {/* Pixel corners */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#48bb78]" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#48bb78]" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#48bb78]" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#48bb78]" />
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-2 sm:top-2 right-2 sm:right-2 w-8 h-8 flex items-center justify-center
                  bg-red-500 hover:bg-red-600 text-white font-bold rounded z-10"
              >
                ×
              </motion.button>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export function StyledDialogTrigger({ children, onClick, className }: DialogTriggerProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-8 py-3 bg-[#48bb78] text-white font-bold rounded
        shadow-[0_4px_0_#2f855a] hover:shadow-[0_2px_0_#2f855a] 
        hover:translate-y-[2px] transition-all duration-150
        border-2 border-[#276749] ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

export function StyledDialogHeader({ children, className }: DialogHeaderProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`mb-4 sm:mb-6 text-center ${className || ""}`}
    >
      <h2 className="text-xl sm:text-3xl font-bold text-[#48bb78] uppercase
        tracking-wider [text-shadow:2px_2px_0_#276749]">
        {children}
      </h2>
    </motion.div>
  );
}

export function StyledDialogDescription({ children, className }: DialogDescriptionProps) {
  return (
    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`text-sm sm:text-base text-gray-300 text-center leading-relaxed
        [text-shadow:1px_1px_0_#000] ${className || ""}`}
    >
      {children}
    </motion.p>
  );
}

export function StyledDialogFooter({ children, className }: DialogFooterProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`mt-4 sm:mt-8 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 ${className || ""}`}
    >
      {children}
    </motion.div>
  );
}

export function DialogExample() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [animationType, setAnimationType] = useState<keyof typeof animationStyles>("powerUp");

  return (
    <div className="p-8 bg-[#2d3748] min-h-screen flex flex-col items-center justify-center space-y-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {Object.keys(animationStyles).map((type) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-[#4a5568] text-white font-bold rounded
              hover:bg-[#718096] transition-colors uppercase tracking-wide
              border-2 border-[#2d3748]"
            onClick={() => setAnimationType(type as keyof typeof animationStyles)}
          >
            {type.replace(/([A-Z])/g, ' $1').trim()}
          </motion.button>
        ))}
      </div>

      <StyledDialog>
        <StyledDialogTrigger onClick={() => setIsDialogOpen(true)}>
          Start Game
        </StyledDialogTrigger>
        <StyledDialogContent
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          animationType={animationType}
        >
          <StyledDialogHeader>
            8-Bit Dialog
          </StyledDialogHeader>
          <StyledDialogDescription>
            Choose your adventure! This retro-inspired dialog brings the charm of 
            classic video games with pixelated corners and game-like animations.
          </StyledDialogDescription>
          <StyledDialogFooter>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDialogOpen(false)}
              className="w-full sm:w-auto px-6 py-2 bg-[#4a5568] text-white font-bold rounded
                hover:bg-[#718096] transition-colors uppercase tracking-wide
                border-2 border-[#2d3748]"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsDialogOpen(false);
                alert("Game started!");
              }}
              className="w-full sm:w-auto px-6 py-2 bg-[#48bb78] text-white font-bold rounded
                hover:bg-[#38a169] transition-colors uppercase tracking-wide
                border-2 border-[#276749]"
            >
              Play
            </motion.button>
          </StyledDialogFooter>
        </StyledDialogContent>
      </StyledDialog>
    </div>
  );
} 