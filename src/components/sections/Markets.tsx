"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionShell, { revealItem } from "../ui/SectionShell";
import GlassCard from "../ui/GlassCard";
import {
  fetchHyperliquid,
  fetchPolymarket,
  fmtChange,
  fmtPrice,
  hlTradeUrl,
  pmTradeUrl,
  type HLTicker,
  type PMMarket,
} from "@/lib/markets";

const FALLBACK_HL: HLTicker[] = [
  { symbol: "BTC", label: "BTC-USDC", price: 77628, change24h: -1.0, positive: false },
  { symbol: "ETH", label: "ETH-USDC", price: 2324.7, change24h: -3.5, positive: false },
  { symbol: "xyz:CL", label: "CL-USDC", price: 93.86, change24h: 2.95, positive: true },
  { symbol: "xyz:SP500", label: "SP500-USDC", price: 7120.7, change24h: 0.12, positive: true },
];

const FALLBACK_PM: PMMarket[] = [
  { question: "2028 US Presidential winner", yesPrice: 0.52, slug: "" },
  { question: "Fed cuts rates in Q3", yesPrice: 0.68, slug: "" },
  { question: "BTC > $100k by year end", yesPrice: 0.43, slug: "" },
  { question: "Champions League winner", yesPrice: 0.31, slug: "" },
];

function usePoll<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  initial: T,
  intervalMs: number
): { data: T; stale: boolean } {
  const [data, setData] = useState<T>(initial);
  const [stale, setStale] = useState(false);
  useEffect(() => {
    let cancelled = false;
    let failCount = 0;
    const tick = async () => {
      const controller = new AbortController();
      try {
        const res = await fn(controller.signal);
        if (cancelled) return;
        setData(res);
        failCount = 0;
        setStale(false);
      } catch {
        failCount += 1;
        if (failCount >= 2 && !cancelled) setStale(true);
      }
    };
    tick();
    const id = setInterval(tick, intervalMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [fn, intervalMs]);
  return { data, stale };
}

function usePriceFlash(value: number) {
  const prev = useRef<number>(value);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  useEffect(() => {
    if (value === prev.current) return;
    setFlash(value > prev.current ? "up" : "down");
    prev.current = value;
    const t = setTimeout(() => setFlash(null), 900);
    return () => clearTimeout(t);
  }, [value]);
  return flash;
}

function Wordmark({ name }: { name: string }) {
  return (
    <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.28em] uppercase text-white/80">
      {name}
    </span>
  );
}

function LivePill({ stale = false }: { stale?: boolean }) {
  const color = stale ? "#F0C76F" : "#7BE38C";
  return (
    <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/70">
      <span className="relative flex h-2 w-2">
        {!stale && (
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
            style={{ backgroundColor: color }}
          />
        )}
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      </span>
      {stale ? "Stale" : "Live"}
    </span>
  );
}

function RowArrow() {
  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center w-4 h-4 shrink-0 text-white/40 group-hover:text-white/90 transition-colors text-[12px] leading-none"
    >
      ↗
    </span>
  );
}

function HLRow({ t }: { t: HLTicker }) {
  const flash = usePriceFlash(t.price);
  return (
    <a
      href={hlTradeUrl(t.symbol)}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "group flex items-center gap-4 px-4 py-3.5 tabular min-h-[48px]",
        "transition-colors duration-200",
        "hover:bg-white/[0.05] active:bg-white/[0.1]",
        flash === "up"
          ? "bg-[#7BE38C]/10"
          : flash === "down"
          ? "bg-[#F98C8C]/10"
          : "",
      ].join(" ")}
    >
      <span className="flex-1 text-white text-[13px] font-medium tracking-wide">
        {t.label}
      </span>
      <span className="text-white text-[14px]">{fmtPrice(t.price)}</span>
      <span
        className={[
          "text-[12px] font-medium min-w-[62px] text-right",
          t.positive ? "text-[#7BE38C]" : "text-[#F98C8C]",
        ].join(" ")}
      >
        {fmtChange(t.change24h)}
      </span>
      <RowArrow />
    </a>
  );
}

function PMRow({ m }: { m: PMMarket }) {
  const cents = Math.round(m.yesPrice * 100);
  return (
    <a
      href={pmTradeUrl(m.slug)}
      target="_blank"
      rel="noopener noreferrer"
      title={m.question}
      className="group flex items-center gap-4 px-4 py-3.5 min-h-[48px] transition-colors duration-200 hover:bg-white/[0.05] active:bg-white/[0.1]"
    >
      <span className="flex-1 min-w-0 text-white text-[13px] leading-tight truncate">
        {m.question}
      </span>
      <span className="text-[11px] uppercase tracking-[0.14em] text-white/60 shrink-0">
        Yes
      </span>
      <span className="text-white text-[14px] tabular font-medium min-w-[38px] text-right shrink-0">
        {cents}¢
      </span>
      <RowArrow />
    </a>
  );
}

export default function Markets() {
  const { data: hl, stale: hlStale } = usePoll(
    fetchHyperliquid,
    FALLBACK_HL,
    5_000
  );
  const { data: pm, stale: pmStale } = usePoll(
    fetchPolymarket,
    FALLBACK_PM,
    20_000
  );

  return (
    <SectionShell id="markets">
      <motion.div variants={revealItem} className="max-w-[820px] mb-14 sm:mb-16">
        <span className="text-[11px] uppercase tracking-[0.24em] text-white/70">
          Live markets
        </span>
        <h2
          className="mt-4 text-white tracking-tight leading-[1.04]"
          style={{ fontSize: "clamp(38px, 6vw, 68px)" }}
        >
          Every market,{" "}
          <span className="font-display italic font-normal">live</span>.
        </h2>
        <p className="mt-5 text-white/85 leading-relaxed max-w-[600px] text-[16px] sm:text-[18px]">
          Hyperliquid and Polymarket — the fastest, cheapest way to trade both.
          Tap any market to open it on Aura.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <motion.div variants={revealItem}>
          <GlassCard tone="default" padding="lg" interactive className="h-full">
            <div className="flex items-center justify-between mb-6">
              <Wordmark name="Hyperliquid" />
              <LivePill stale={hlStale} />
            </div>
            <h3 className="text-white text-[22px] sm:text-[26px] tracking-tight leading-[1.15] mb-1">
              The Hyperliquid universe.
            </h3>
            <p className="text-white/75 text-[14px] leading-relaxed mb-6">
              Perps and spot today. Prediction markets soon. At native
              Hyperliquid prices.
            </p>
            <div className="rounded-2xl border border-white/15 divide-y divide-white/10 overflow-hidden">
              {hl.map((t) => (
                <HLRow key={t.symbol} t={t} />
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={revealItem}>
          <GlassCard tone="default" padding="lg" interactive className="h-full">
            <div className="flex items-center justify-between mb-6">
              <Wordmark name="Polymarket" />
              <LivePill stale={pmStale} />
            </div>
            <h3 className="text-white text-[22px] sm:text-[26px] tracking-tight leading-[1.15] mb-1">
              The world&rsquo;s biggest markets.
            </h3>
            <p className="text-white/75 text-[14px] leading-relaxed mb-6">
              Politics, sports, crypto, culture — priced by the crowd.
            </p>
            <div className="rounded-2xl border border-white/15 divide-y divide-white/10 overflow-hidden">
              {pm.map((m, i) => (
                <PMRow key={m.slug || `pm-${i}`} m={m} />
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </SectionShell>
  );
}
