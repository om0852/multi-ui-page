"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const animationStyles = {
  elastic: {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { type: "spring", damping: 10, stiffness: 100 }
  },
  swirl: {
    initial: { rotate: -180, scale: 0, opacity: 0 },
    animate: { rotate: 0, scale: 1, opacity: 1 },
    exit: { rotate: 180, scale: 0, opacity: 0 },
    transition: { type: "spring", damping: 15 }
  },
  slide3D: {
    initial: { rotateX: 90, y: 50, opacity: 0 },
    animate: { rotateX: 0, y: 0, opacity: 1 },
    exit: { rotateX: -90, y: -50, opacity: 0 },
    transition: { type: "spring", damping: 20 }
  },
  bounce: {
    initial: { y: -300, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 300, opacity: 0 },
    transition: { type: "spring", bounce: 0.5 }
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <motion.div
              {...animation}
              className={`relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 
                text-white rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.3)] p-4 sm:p-8 w-full max-w-[90%] sm:max-w-md md:max-w-lg
                border border-indigo-500/30 backdrop-blur-xl overflow-y-auto max-h-[90vh] ${className || ""}`}
            >
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-purple-500 rounded-full animate-ping" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-pink-500 rounded-full animate-ping" />
              <button
                onClick={onClose}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 flex items-center justify-center
                  rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              >
                ✕
              </button>
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
      className={`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
        text-white py-3 px-8 rounded-xl shadow-lg hover:shadow-purple-500/30
        transition-shadow duration-300 font-medium ${className || ""}`}
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
      className={`mb-4 sm:mb-6 ${className || ""}`}
    >
      <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent 
        bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
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
      className={`text-sm sm:text-base text-gray-300 mt-2 leading-relaxed ${className || ""}`}
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
      className={`mt-4 sm:mt-8 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 ${className || ""}`}
    >
      {children}
    </motion.div>
  );
}

export function DialogExample() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [animationType, setAnimationType] = useState<keyof typeof animationStyles>("elastic");

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 
      min-h-screen flex flex-col items-center justify-center space-y-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {Object.keys(animationStyles).map((type) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-lg text-white font-medium
              bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setAnimationType(type as keyof typeof animationStyles)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </motion.button>
        ))}
      </div>

      <StyledDialog>
        <StyledDialogTrigger onClick={() => setIsDialogOpen(true)}>
          Open Modern Dialog
        </StyledDialogTrigger>
        <StyledDialogContent
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          animationType={animationType}
        >
          <StyledDialogHeader>
            Modern Elegance
          </StyledDialogHeader>
          <StyledDialogDescription>
            Experience the perfect blend of modern design and smooth animations. 
            Try different animation styles to see the magic unfold!
          </StyledDialogDescription>
          <StyledDialogFooter>
            <button 
              onClick={() => setIsDialogOpen(false)}
              className="w-full sm:w-auto px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 
                text-white font-medium transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                setIsDialogOpen(false);
                alert("Action confirmed!");
              }}
              className="w-full sm:w-auto px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                text-white font-medium"
            >
              Confirm
            </button>
          </StyledDialogFooter>
        </StyledDialogContent>
      </StyledDialog>
    </div>
  );
} 