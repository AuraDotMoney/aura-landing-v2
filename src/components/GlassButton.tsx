"use client";

import { motion } from "framer-motion";

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// Custom easing curve - punchy ease-out for responsive feel
// Based on https://emilkowal.ski/ui/7-practical-animation-tips
const snappyEase = [0.23, 1, 0.32, 1] as const; // Custom cubic-bezier for energetic motion

export default function GlassButton({ 
  children, 
  onClick,
  className = "" 
}: GlassButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        // Per-property transitions: delay only applies to entrance animation
        opacity: { duration: 0.25, delay: 0.4, ease: snappyEase },
        y: { duration: 0.25, delay: 0.4, ease: snappyEase },
        // Scale and boxShadow stay fast for hover/tap interactions
        scale: { duration: 0.15, ease: snappyEase },
        boxShadow: { duration: 0.15, ease: snappyEase },
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 0 24px rgba(255, 255, 255, 0.15)",
      }}
      whileTap={{ 
        scale: 0.97, // The magic number from Emil's article
      }}
      onClick={onClick}
      className={`
        h-[50px]
        px-[20px]
        rounded-full
        bg-transparent
        border border-white
        text-white
        text-[18px]
        cursor-pointer
        flex items-center justify-center
        ${className}
      `}
      style={{
        fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: 510,
        willChange: "transform", // Hint for GPU acceleration
      }}
    >
      {children}
    </motion.button>
  );
}

