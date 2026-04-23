"use client";

import { motion } from "framer-motion";
import SectionShell, { revealItem } from "../ui/SectionShell";
import GlassCard from "../ui/GlassCard";
import FeatureTile from "../ui/FeatureTile";

function FeesTile() {
  return (
    <motion.div variants={revealItem} className="md:col-span-6">
      <GlassCard tone="highlight" padding="lg" interactive className="h-full">
        <div className="flex flex-col gap-2 mb-8">
          <span className="text-[11px] uppercase tracking-[0.24em] text-white/70">
            Fees
          </span>
          <h3
            className="text-white tracking-tight leading-[1.04]"
            style={{ fontSize: "clamp(32px, 4.2vw, 54px)" }}
          >
            Lowest{" "}
            <span className="font-display italic font-normal">fees</span>{" "}
            anywhere, however you trade.
          </h3>
          <p className="text-white/80 text-[15px] sm:text-[17px] leading-relaxed max-w-[640px] mt-2">
            Keep more of every trade — whether you use an Aura account or bring
            your own wallet. Same lowest-in-class fees on iOS, Android, and
            desktop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <FeeColumn
            eyebrow="Aura account"
            hlStat="0%"
            hlNote="Builder fees on Hyperliquid until $1B lifetime volume."
            pmStat="0%"
            pmNote="On Polymarket. Forever."
            accent="emphasis"
          />
          <FeeColumn
            eyebrow="Bring your own wallet"
            hlStat="0.01%"
            hlNote="The lowest builder fee on Hyperliquid — and the only one you can use from mobile."
            pmStat="0%"
            pmNote="On Polymarket. Forever."
            accent="subtle"
          />
        </div>
      </GlassCard>
    </motion.div>
  );
}

function FeeColumn({
  eyebrow,
  hlStat,
  hlNote,
  pmStat,
  pmNote,
  accent,
}: {
  eyebrow: string;
  hlStat: string;
  hlNote: string;
  pmStat: string;
  pmNote: string;
  accent: "emphasis" | "subtle";
}) {
  const bgClass =
    accent === "emphasis"
      ? "bg-white/[0.09] border-white/25"
      : "bg-white/[0.04] border-white/15";

  return (
    <div
      className={`rounded-2xl border ${bgClass} p-6 sm:p-7 flex flex-col gap-5`}
    >
      <span className="text-[11px] uppercase tracking-[0.22em] text-white/75">
        {eyebrow}
      </span>

      <FeeRow protocol="Hyperliquid" stat={hlStat} note={hlNote} />
      <div className="h-px bg-white/12" />
      <FeeRow protocol="Polymarket" stat={pmStat} note={pmNote} />
    </div>
  );
}

function FeeRow({
  protocol,
  stat,
  note,
}: {
  protocol: string;
  stat: string;
  note: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <span className="text-white text-[13px] tracking-wide">{protocol}</span>
        <span className="text-white font-display italic text-[32px] sm:text-[44px] lg:text-[52px] leading-none tabular">
          {stat}
        </span>
      </div>
      <p className="text-white/70 text-[13px] leading-relaxed">{note}</p>
    </div>
  );
}

export default function Features() {
  return (
    <SectionShell id="features">
      <motion.div variants={revealItem} className="max-w-[820px] mb-14 sm:mb-16">
        <span className="text-[11px] uppercase tracking-[0.24em] text-white/70">
          Why Aura
        </span>
        <h2
          className="mt-4 text-white tracking-tight leading-[1.04]"
          style={{ fontSize: "clamp(38px, 6vw, 68px)" }}
        >
          The fastest, cheapest way to trade{" "}
          <span className="font-display italic font-normal">Hyperliquid</span>{" "}
          and{" "}
          <span className="font-display italic font-normal">Polymarket</span>.
        </h2>
        <p className="mt-5 text-white/85 leading-relaxed max-w-[620px] text-[16px] sm:text-[18px]">
          Lowest-in-class fees. One wallet across both protocols. Full feature
          parity on iOS, Android, and desktop — whether you create an account
          or bring your own wallet.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-5 sm:gap-6">
        <FeesTile />

        <FeatureTile
          icon="wallet"
          title="Fund any way"
          body="Apple Pay, Google Pay, or direct BTC, ETH, and SOL deposits. Minutes, not days."
          className="md:col-span-2"
        />
        <FeatureTile
          icon="chart"
          title="Zero switching"
          body="Jump from a Hyperliquid fill to a Polymarket market in a tap. One login, one wallet, one history — no app-hopping."
          className="md:col-span-2"
        />
        <FeatureTile
          icon="phone"
          title="Every device"
          body="iOS, Android, and desktop. Full feature parity — including bring-your-own-wallet on mobile."
          className="md:col-span-2"
        />
      </div>
    </SectionShell>
  );
}
