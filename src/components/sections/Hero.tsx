"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PrimaryCTA from "../ui/PrimaryCTA";
import { Icon } from "../ui/icons";

const snappyEase = [0.23, 1, 0.32, 1] as const;

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative isolate min-h-screen flex flex-col">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/background.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom hidden sm:block"
        />
        <Image
          src="/background-mobile.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom sm:hidden"
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 pt-28 pb-32 sm:pt-32 sm:pb-40">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="w-full max-w-[920px] mx-auto flex flex-col items-center text-center"
        >
          <motion.h1
            variants={item}
            transition={{ duration: 0.7, ease: snappyEase }}
            className="text-white tracking-tight font-normal leading-[1.02]"
            style={{
              fontSize: "clamp(52px, 10vw, 120px)",
              textShadow: "0 2px 24px rgba(0,0,0,0.14)",
            }}
          >
            <span className="font-display italic font-normal">Trade</span>{" "}
            everything
          </motion.h1>

          <motion.p
            variants={item}
            transition={{ duration: 0.6, ease: snappyEase, delay: 0.05 }}
            className="mt-7 text-white/92 max-w-[620px] leading-relaxed"
            style={{
              fontSize: "clamp(17px, 1.6vw, 21px)",
              textShadow: "0 1px 10px rgba(0,0,0,0.1)",
            }}
          >
            The fastest, cheapest way to trade Hyperliquid and Polymarket — on
            iOS, Android, and desktop.
          </motion.p>

          <motion.div
            variants={item}
            transition={{ duration: 0.6, ease: snappyEase, delay: 0.15 }}
            className="mt-10"
          >
            <PrimaryCTA href="https://trade.aura.money" size="lg">
              Launch App
              <Icon name="arrowRight" size={18} className="ml-2 -mr-1" />
            </PrimaryCTA>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
