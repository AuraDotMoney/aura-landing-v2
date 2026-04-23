"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import GlassCard from "./GlassCard";
import { Icon, type IconName } from "./icons";
import { revealItem } from "./SectionShell";

interface Props {
  icon: IconName;
  title: ReactNode;
  body: string;
  stat?: string;
  statLabel?: string;
  highlighted?: boolean;
  className?: string;
}

export default function FeatureTile({
  icon,
  title,
  body,
  stat,
  statLabel,
  highlighted = false,
  className = "",
}: Props) {
  return (
    <motion.div variants={revealItem} className={className}>
      <GlassCard
        tone={highlighted ? "highlight" : "default"}
        padding={highlighted ? "lg" : "md"}
        interactive
        className="h-full flex flex-col gap-5"
      >
        <div
          className={[
            "flex items-center justify-center rounded-2xl text-white",
            "bg-white/12 border border-white/40",
            highlighted ? "w-14 h-14" : "w-11 h-11",
          ].join(" ")}
        >
          <Icon name={icon} size={highlighted ? 26 : 22} />
        </div>

        <div className="flex flex-col gap-2">
          <h3
            className={[
              "text-white tracking-tight font-medium",
              highlighted
                ? "text-[28px] sm:text-[34px] leading-[1.08]"
                : "text-[19px] sm:text-[21px] leading-tight",
            ].join(" ")}
          >
            {title}
          </h3>
          <p
            className={[
              "text-white/80 leading-relaxed",
              highlighted ? "text-[16px] mt-1 max-w-[30ch]" : "text-[14px]",
            ].join(" ")}
          >
            {body}
          </p>
        </div>

        {highlighted && stat && (
          <div className="mt-auto pt-5 flex items-baseline gap-3 border-t border-white/15">
            <span className="text-white font-display italic text-[64px] leading-none tabular">
              {stat}
            </span>
            {statLabel && (
              <span className="text-white/70 text-[12px] uppercase tracking-[0.18em]">
                {statLabel}
              </span>
            )}
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}
