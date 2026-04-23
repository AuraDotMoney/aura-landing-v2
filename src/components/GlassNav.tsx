"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const snappyEase = [0.23, 1, 0.32, 1] as const;

const iconTransition = {
  type: "tween" as const,
  duration: 0.15,
  ease: snappyEase,
};

export default function GlassNav() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 160], [0.04, 0.1]);
  const blurPx = useTransform(scrollY, [0, 160], [22, 32]);
  const borderOpacity = useTransform(scrollY, [0, 160], [0.28, 0.45]);
  const shadowOpacity = useTransform(scrollY, [0, 160], [0.1, 0.2]);

  return (
    <div className="fixed top-0 inset-x-0 z-50 px-6 sm:px-10 lg:px-16 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: snappyEase }}
        className="mx-auto w-full max-w-[1280px] mt-4 sm:mt-5 pointer-events-auto"
      >
        <motion.nav
          style={{
            backgroundColor: useTransform(
              bgOpacity,
              (v) => `rgba(255,255,255,${v})`
            ),
            backdropFilter: useTransform(
              blurPx,
              (v) => `blur(${v}px) saturate(160%)`
            ),
            WebkitBackdropFilter: useTransform(
              blurPx,
              (v) => `blur(${v}px) saturate(160%)`
            ),
            borderColor: useTransform(
              borderOpacity,
              (v) => `rgba(255,255,255,${v})`
            ),
            boxShadow: useTransform(
              shadowOpacity,
              (v) =>
                `0 20px 40px -16px rgba(0,0,0,${v}), inset 0 1px 0 0 rgba(255,255,255,0.22)`
            ),
          }}
          className="flex items-center gap-3 h-[54px] sm:h-[58px] pl-5 pr-2 sm:pl-6 sm:pr-2.5 rounded-full border"
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={iconTransition}
            className="flex items-center shrink-0"
            style={{ willChange: "transform" }}
          >
            <Image
              src="/logo.svg"
              alt="Aura"
              width={91}
              height={20}
              priority
              unoptimized
              className="h-5 w-[91px] object-contain"
            />
          </motion.a>

          <div className="flex-1" />

          <div className="hidden sm:flex items-center gap-0.5">
            <motion.a
              href="https://x.com/auramoney"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={iconTransition}
              className="flex items-center justify-center w-9 h-9 rounded-full text-white/75 hover:text-white hover:bg-white/8 transition-colors"
              aria-label="X"
            >
              <Image
                src="/x.svg"
                alt=""
                width={18}
                height={18}
                unoptimized
                className="opacity-80"
              />
            </motion.a>
            <motion.a
              href="https://t.me/auradotmoney"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={iconTransition}
              className="flex items-center justify-center w-9 h-9 rounded-full text-white/75 hover:text-white hover:bg-white/8 transition-colors"
              aria-label="Telegram"
            >
              <Image
                src="/telegram.svg"
                alt=""
                width={18}
                height={18}
                unoptimized
                className="opacity-80"
              />
            </motion.a>
          </div>

          <motion.a
            href="https://trade.aura.money"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={iconTransition}
            className="inline-flex h-[40px] px-4 sm:px-5 items-center rounded-full border border-white/50 text-white text-[13px] tracking-tight hover:bg-white hover:text-[#1A4C72] hover:border-white active:bg-white active:text-[#1A4C72] transition-colors ml-1"
            style={{ willChange: "transform" }}
          >
            Launch app
          </motion.a>
        </motion.nav>
      </motion.div>
    </div>
  );
}
