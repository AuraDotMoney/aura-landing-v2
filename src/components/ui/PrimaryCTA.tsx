"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const snappyEase = [0.23, 1, 0.32, 1] as const;

type Size = "md" | "lg";

interface Props extends Omit<HTMLMotionProps<"a">, "children"> {
  children: ReactNode;
  href: string;
  size?: Size;
  className?: string;
}

const sizeMap: Record<Size, string> = {
  md: "h-[50px] px-6 text-[16px]",
  lg: "h-[62px] px-8 text-[18px]",
};

export default function PrimaryCTA({
  children,
  href,
  size = "md",
  className = "",
  ...rest
}: Props) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 22px 40px -12px rgba(0,0,0,0.22), 0 0 24px rgba(255,255,255,0.25)",
      }}
      whileTap={{ scale: 0.97, filter: "blur(0.3px) brightness(0.96)" }}
      transition={{ type: "tween", duration: 0.18, ease: snappyEase }}
      className={[
        sizeMap[size],
        "inline-flex items-center justify-center",
        "rounded-full bg-white text-[#1A4C72] font-medium",
        "cursor-pointer select-none tracking-tight",
        "shadow-[0_12px_30px_-10px_rgba(0,0,0,0.25)]",
        "whitespace-nowrap",
        className,
      ].join(" ")}
      style={{
        willChange: "transform, filter",
      }}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
