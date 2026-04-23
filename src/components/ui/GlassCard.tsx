"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const snappyEase = [0.23, 1, 0.32, 1] as const;

type Tone = "default" | "highlight";
type Padding = "sm" | "md" | "lg";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  tone?: Tone;
  padding?: Padding;
  interactive?: boolean;
  className?: string;
}

const paddingMap: Record<Padding, string> = {
  sm: "p-5 sm:p-6",
  md: "p-7 sm:p-8",
  lg: "p-8 sm:p-10",
};

export default function GlassCard({
  children,
  tone = "default",
  padding = "md",
  interactive = false,
  className = "",
  ...motionProps
}: GlassCardProps) {
  const toneClass = tone === "highlight" ? "glass-surface-highlight" : "glass-surface";

  return (
    <motion.div
      whileHover={
        interactive
          ? { y: -4, transition: { duration: 0.25, ease: snappyEase } }
          : undefined
      }
      className={[
        toneClass,
        "rounded-[26px]",
        paddingMap[padding],
        "relative overflow-hidden",
        interactive ? "cursor-default" : "",
        className,
      ].join(" ")}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
