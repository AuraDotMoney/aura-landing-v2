"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import GlassNav from "./GlassNav";
import MotionProvider from "./MotionProvider";

const snappyEase = [0.23, 1, 0.32, 1] as const;

interface Props {
  title: string;
  eyebrow?: string;
  updated?: string;
  children: ReactNode;
}

export default function LegalLayout({
  title,
  eyebrow,
  updated,
  children,
}: Props) {
  return (
    <MotionProvider>
      <main className="relative min-h-screen">
        <GlassNav />

        <div className="px-6 sm:px-10 lg:px-16 pt-32 sm:pt-36 pb-20">
          <div className="mx-auto w-full max-w-[880px]">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: snappyEase }}
              className="mb-10 sm:mb-12"
            >
              {eyebrow && (
                <span className="block text-[11px] uppercase tracking-[0.24em] text-white/70 mb-4">
                  {eyebrow}
                </span>
              )}
              <h1 className="text-white tracking-tight leading-[1.02]" style={{ fontSize: "clamp(44px, 7vw, 88px)" }}>
                <span className="font-display italic font-normal">{title}</span>
              </h1>
              {updated && (
                <p className="mt-4 text-white/70 text-[13px] uppercase tracking-[0.14em]">
                  Last updated: {updated}
                </p>
              )}
            </motion.header>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: snappyEase, delay: 0.1 }}
              className="glass-surface rounded-[26px] p-6 sm:p-10 lg:p-12 legal-prose"
            >
              {children}
            </motion.article>

            <footer className="mt-12 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <Link href="/" className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/logo.svg"
                  alt="Aura"
                  width={91}
                  height={20}
                  unoptimized
                  className="h-5 w-[91px] object-contain"
                />
              </Link>
              <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-white/75">
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms
                </Link>
                <Link href="/support" className="hover:text-white transition-colors">
                  Support
                </Link>
              </nav>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                © 2026 Infinite Aura Pte Ltd
              </p>
            </footer>
          </div>
        </div>
      </main>
    </MotionProvider>
  );
}
