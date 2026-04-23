"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const snappyEase = [0.23, 1, 0.32, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: snappyEase } },
};

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
  as?: "section" | "footer";
}

export default function SectionShell({
  children,
  className = "",
  id,
  fullHeight = true,
  as = "section",
}: Props) {
  const Comp = motion[as];
  return (
    <Comp
      id={id}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={[
        "relative w-full",
        fullHeight ? "min-h-[90vh]" : "",
        "px-6 sm:px-10 lg:px-16",
        "py-20 sm:py-28 lg:py-32",
        className,
      ].join(" ")}
    >
      <div className="mx-auto w-full max-w-[1280px]">{children}</div>
    </Comp>
  );
}
