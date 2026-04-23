"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionShell, { revealItem } from "../ui/SectionShell";
import PrimaryCTA from "../ui/PrimaryCTA";

const snappyEase = [0.23, 1, 0.32, 1] as const;

export default function FooterCTA() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[var(--sky-deep)]/40 to-[var(--sky-close)]"
      />

      <SectionShell
        id="ready"
        as="footer"
        fullHeight={false}
        className="!pt-24 !pb-12 sm:!pt-32 sm:!pb-14"
      >
        <motion.div
          variants={revealItem}
          className="flex flex-col items-center text-center"
        >
          <span className="text-[11px] uppercase tracking-[0.24em] text-white/70">
            Ready?
          </span>
          <h2
            className="mt-4 text-white tracking-tight leading-[0.98]"
            style={{ fontSize: "clamp(56px, 10vw, 140px)" }}
          >
            Let&rsquo;s{" "}
            <span className="font-display italic font-normal">trade</span>.
          </h2>
          <p className="mt-6 text-white/85 leading-relaxed max-w-[520px] text-[17px] sm:text-[19px]">
            One login. Every market. Lowest fees in the game.
          </p>

          <motion.div
            variants={revealItem}
            transition={{ duration: 0.6, ease: snappyEase }}
            className="mt-10 sm:mt-12"
          >
            <PrimaryCTA href="https://trade.aura.money" size="lg">
              Launch App
            </PrimaryCTA>
          </motion.div>
        </motion.div>

        <div className="mt-24 sm:mt-28 pt-10 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Aura"
                width={91}
                height={20}
                unoptimized
                className="h-5 w-[91px] object-contain"
              />
            </Link>
            <div className="flex items-center gap-3">
              <motion.a
                href="https://x.com/auramoney"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15, ease: snappyEase }}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/25 hover:border-white/55 transition-colors"
                aria-label="X"
              >
                <Image src="/x.svg" alt="" width={18} height={18} unoptimized />
              </motion.a>
              <motion.a
                href="https://t.me/auradotmoney"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15, ease: snappyEase }}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/25 hover:border-white/55 transition-colors"
                aria-label="Telegram"
              >
                <Image
                  src="/telegram.svg"
                  alt=""
                  width={18}
                  height={18}
                  unoptimized
                />
              </motion.a>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-white/75">
            <a
              href="https://docs.aura.money"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Docs
            </a>
            <Link href="/support" className="hover:text-white transition-colors">
              Support
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Terms
            </Link>
          </nav>
        </div>

        <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-white/55">
          © 2026 Infinite Aura Pte Ltd
        </p>
      </SectionShell>
    </div>
  );
}
