"use client";

import { useEffect, useState } from "react";

export default function Hero() {
	const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);

	useEffect(() => {
		if (!isRegistrationPopupOpen) {
			return;
		}

		function handleEscKey(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setIsRegistrationPopupOpen(false);
			}
		}

		window.addEventListener("keydown", handleEscKey);

		return () => {
			window.removeEventListener("keydown", handleEscKey);
		};
	}, [isRegistrationPopupOpen]);

	return (
		<>
			<section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden">
				<div className="absolute top-1/4 left-1/4 h-72 w-72 animate-pulse rounded-full bg-brand-cyan/20 opacity-70 mix-blend-screen blur-[120px]" />
				<div
					className="absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-brand-purple/20 opacity-70 mix-blend-screen blur-[120px]"
					style={{ animationDelay: "2s" }}
				/>
				<div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-pink/10 opacity-50 mix-blend-screen blur-[150px]" />

				<div className="relative z-10 mx-auto max-w-5xl px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8">
					<div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-[0_4px_20px_rgba(0,240,255,0.1)] backdrop-blur-md">
						<span className="h-2 w-2 animate-ping rounded-full bg-brand-cyan shadow-[0_0_10px_#00f0ff]" />
						<span className="absolute h-2 w-2 rounded-full bg-brand-cyan" />
						<span className="text-xs font-semibold tracking-wider text-brand-light uppercase sm:text-sm">
							Platform Kolaborasi #1
						</span>
					</div>

					<h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight sm:text-6xl md:text-7xl">
						Hubungkan{" "}
						<span className="bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(176,38,255,0.5)]">
							UMKM Lokal
						</span>{" "}
						<br className="hidden sm:block" />
						dengan Micro-Influencer
					</h1>

					<p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-brand-light/70 sm:text-lg md:text-xl">
						Solusi win-win untuk ekonomi lokal. Kami membantu bisnis agar lebih
						dikenal melalui konten autentik, dan memberikan wadah bagi para
						kreator untuk menghasilkan pendapatan dari review jujur mereka.
					</p>

					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<button
							type="button"
							onClick={() => setIsRegistrationPopupOpen(true)}
							className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl border border-brand-cyan/30 bg-brand-surface px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:border-brand-cyan hover:bg-brand-dark hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] sm:w-auto"
						>
							<span className="relative z-10 flex items-center gap-2">
								Level-Up Bisnis Anda
								<svg
									className="h-5 w-5 transition-transform group-hover:translate-x-1"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M13 7l5 5m0 0l-5 5m5-5H6"
									/>
								</svg>
							</span>
							<div className="absolute inset-0 h-full w-full bg-gradient-to-r from-brand-cyan/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						</button>

						<button
							type="button"
							onClick={() => setIsRegistrationPopupOpen(true)}
							className="group relative inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink px-8 py-4 text-base font-bold text-white shadow-[0_0_20px_rgba(176,38,255,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,0,60,0.5)] active:scale-95 sm:w-auto"
						>
							<span className="relative z-10 flex items-center gap-2">
								Mulai Jadi Kreator
								<svg
									className="h-5 w-5 transition-transform group-hover:rotate-12"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								</svg>
							</span>
						</button>
					</div>
				</div>
			</section>

			{isRegistrationPopupOpen ? (
				<div
					className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4"
					onClick={() => setIsRegistrationPopupOpen(false)}
				>
					<div
						role="dialog"
						aria-modal="true"
						className="relative w-full max-w-md rounded-2xl border border-white/10 bg-brand-surface/95 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.7)] backdrop-blur-xl"
						onClick={(event) => event.stopPropagation()}
					>
						<button
							type="button"
							onClick={() => setIsRegistrationPopupOpen(false)}
							className="absolute top-3 right-3 rounded-lg px-2 py-1 text-brand-light/70 transition-colors hover:text-white"
							aria-label="Close popup"
						>
							×
						</button>
						<p className="text-lg font-semibold text-white">Continue your registration here</p>
						<a
							href="#"
							className="mt-3 inline-block font-semibold text-brand-cyan underline decoration-brand-cyan/70 underline-offset-4 transition-colors hover:text-brand-purple"
						>
							placeholder
						</a>
					</div>
				</div>
			) : null}
		</>
	);
}
