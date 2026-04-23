import LegalLayout from "@/components/LegalLayout";

export default function Support() {
	return (
		<LegalLayout eyebrow="Help" title="Support">
			<>
				<p className="text-white/80 text-[16px] mb-8">
					Support, FAQs, and guides for the Aura app.
				</p>

				<h2>Contact us</h2>
				<p>
					If you&rsquo;re experiencing issues or have feedback, reach out
					directly.
				</p>
				<p>
					<a href="mailto:support@aura.money">support@aura.money</a>
				</p>

				<h2>Frequently asked</h2>

				<h3>How do I fund my wallet?</h3>
				<p>
					You can deposit crypto directly to your wallet address, or use our
					integrated Apple Pay / Google Pay provider to buy assets instantly
					within the app.
				</p>

				<h3>I lost access to my device. Can you recover my funds?</h3>
				<p>
					No. Aura is a self-custodial wallet. This means your private keys and
					funds are stored on your device, not on our servers. We cannot
					access, recover, or retrieve your funds if you lose access.
				</p>

				<h3>How do I delete my account?</h3>
				<p>
					We prioritize your privacy. To delete your user data, open the Aura
					app, tap your Profile icon (top left) → Settings (gear icon) →
					Delete Account. This will permanently erase your notification
					preferences and social profile.
				</p>
			</>
		</LegalLayout>
	);
}
