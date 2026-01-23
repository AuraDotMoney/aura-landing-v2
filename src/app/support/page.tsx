"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Custom easing curve - matches landing page
const snappyEase = [0.23, 1, 0.32, 1] as const;

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: snappyEase,
		},
	},
};

export default function Support() {
	return (
		<div
			className="min-h-screen w-full overflow-x-hidden"
			style={{
				background: "linear-gradient(180deg, #4BAAE6 0%, #2E8BC0 100%)",
			}}
		>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="max-w-[800px] mx-auto px-5 py-8"
			>
				{/* Header with Logo */}
				<motion.header variants={itemVariants} className="mb-8">
					<Link
						href="/"
						className="inline-flex items-center gap-2 group"
					>
						<Image
							src="/logo.svg"
							alt="Aura"
							width={91}
							height={20}
							priority
							unoptimized
							className="h-5 w-[91px] object-contain opacity-90 group-hover:opacity-100 transition-opacity"
						/>
					</Link>
				</motion.header>

				{/* Main Content Card */}
				<motion.div
					variants={itemVariants}
					className="rounded-2xl p-8 md:p-6"
					style={{
						background: "rgba(255, 255, 255, 0.12)",
						backdropFilter: "blur(16px) saturate(140%)",
						WebkitBackdropFilter: "blur(16px) saturate(140%)",
						border: "1px solid rgba(255, 255, 255, 0.3)",
					}}
				>
					<h1
						className="text-[2.2em] md:text-[1.8em] mb-2 text-white font-normal"
						style={{
							fontFamily:
								"'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
						}}
					>
						How can we help?
					</h1>

					<p
						className="text-[1.1em] mb-8 text-white/70"
						style={{
							fontFamily:
								"'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
						}}
					>
						Support, FAQs, and guides for the Aura app.
					</p>

					<h2
						className="text-[1.3em] md:text-[1.2em] mt-8 mb-4 text-white font-medium"
						style={{
							fontFamily:
								"'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
						}}
					>
						Contact Us
					</h2>

					<p
						className="mb-4 text-white/80"
						style={{
							fontFamily:
								"'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
						}}
					>
						If you're experiencing issues or have feedback, reach out directly.
					</p>

					<p className="mb-8">
						<a
							href="mailto:support@aura.money"
							className="text-white font-medium hover:text-white/80 underline underline-offset-2 transition-colors"
							style={{
								fontFamily:
									"'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
							}}
						>
							support@aura.money
						</a>
					</p>

					<h2
						className="text-[1.3em] md:text-[1.2em] mt-8 mb-4 text-white font-medium"
						style={{
							fontFamily:
								"'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
						}}
					>
						Frequently Asked Questions
					</h2>

					<div className="mb-6">
						<p
							className="font-medium text-white mb-2"
							style={{
								fontFamily:
									"'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
							}}
						>
							How do I fund my wallet?
						</p>
						<p
							className="text-white/80"
							style={{
								fontFamily:
									"'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
							}}
						>
							You can deposit crypto directly to your wallet address, or use our
							integrated Apple Pay / Google Pay provider to buy assets instantly
							within the app.
						</p>
					</div>

					<div className="mb-6">
						<p
							className="font-medium text-white mb-2"
							style={{
								fontFamily:
									"'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
							}}
						>
							I lost access to my device. Can you recover my funds?
						</p>
						<p
							className="text-white/80"
							style={{
								fontFamily:
									"'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
							}}
						>
							No. Aura is a self-custodial wallet. This means your private keys
							and funds are stored on your device, not on our servers. We cannot
							access, recover, or retrieve your funds if you lose access.
						</p>
					</div>

					<div className="mb-6">
						<p
							className="font-medium text-white mb-2"
							style={{
								fontFamily:
									"'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
							}}
						>
							How do I delete my account?
						</p>
						<p
							className="text-white/80"
							style={{
								fontFamily:
									"'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
							}}
						>
							We prioritize your privacy. To delete your user data, open the
							Aura app, tap your Profile icon (top left) → Settings (gear icon)
							→ Delete Account. This will permanently erase your notification
							preferences and social profile.
						</p>
					</div>

					<hr className="my-8 border-white/20" />

					<div
						className="text-center text-white/60"
						style={{
							fontFamily:
								"'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
						}}
					>
						<Link
							href="/privacy-policy"
							className="text-white/80 hover:text-white transition-colors"
						>
							Privacy Policy
						</Link>
						<span className="mx-3">|</span>
						<Link
							href="/terms-of-service"
							className="text-white/80 hover:text-white transition-colors"
						>
							Terms of Service
						</Link>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
}
