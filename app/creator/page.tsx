"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";

type CreatorCard = {
	id: string;
	name: string;
	niche: string;
	subscribers: string;
	className: string;
	accent: string;
};

const creators: CreatorCard[] = [
	{
		id: "raisa-ugc",
		name: "Raisa",
		niche: "Lifestyle Vlogs",
		subscribers: "980K subscribers",
		className: "md:col-span-1 md:row-span-2 min-h-[440px]",
		accent: "from-brand-cyan/20 via-transparent to-transparent",
	},
	{
		id: "dion-food",
		name: "Dion",
		niche: "Food Reviews",
		subscribers: "1.2M subscribers",
		className: "md:col-span-1 min-h-[390px]",
		accent: "from-brand-purple/20 via-transparent to-transparent",
	},
	{
		id: "naya-beauty",
		name: "Naya",
		niche: "Beauty Creator",
		subscribers: "745K subscribers",
		className: "md:col-span-1 md:row-span-2 min-h-[440px]",
		accent: "from-fuchsia-500/20 via-transparent to-transparent",
	},
	{
		id: "fajar-tech",
		name: "Fajar",
		niche: "Gadget Shorts",
		subscribers: "1.05M subscribers",
		className: "md:col-span-1 min-h-[390px]",
		accent: "from-brand-pink/20 via-transparent to-transparent",
	},
	{
		id: "caca-travel",
		name: "Caca",
		niche: "Travel Reels",
		subscribers: "560K subscribers",
		className: "md:col-span-1 min-h-[300px]",
		accent: "from-cyan-400/20 via-transparent to-transparent",
	},
	{
		id: "miko-fitness",
		name: "Miko",
		niche: "Fitness Motivation",
		subscribers: "890K subscribers",
		className: "md:col-span-1 min-h-[300px]",
		accent: "from-violet-400/20 via-transparent to-transparent",
	},
	{
		id: "syifa-home",
		name: "Syifa",
		niche: "Home Living Tips",
		subscribers: "430K subscribers",
		className: "md:col-span-1 min-h-[300px]",
		accent: "from-brand-cyan/15 via-transparent to-transparent",
	},
];

function BlankProfile() {
	return (
		<div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 pb-20 pt-10">
			<div className="relative flex h-full w-full items-center justify-center">
				<div className="relative h-44 w-44 rounded-full border border-white/15 bg-gradient-to-b from-white/20 to-white/5 shadow-[0_12px_45px_rgba(0,0,0,0.4)]">
					<div className="absolute left-1/2 top-10 h-10 w-10 -translate-x-1/2 rounded-full bg-white/35" />
					<div className="absolute left-1/2 top-[4.6rem] h-[3.8rem] w-[5.6rem] -translate-x-1/2 rounded-t-[42%] rounded-b-[28%] bg-white/28" />
				</div>
			</div>
		</div>
	);
}

export default function CreatorPage() {
	const [visibleIds, setVisibleIds] = useState<string[]>([]);
	const creatorIds = useMemo(() => creators.map((creator) => creator.id), []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				setVisibleIds((prev) => {
					const set = new Set(prev);
					for (const entry of entries) {
						const cardId = (entry.target as HTMLElement).dataset.cardId;
						if (entry.isIntersecting && cardId) {
							set.add(cardId);
						}
					}
					return Array.from(set);
				});
			},
			{ threshold: 0.24, rootMargin: "0px 0px -8% 0px" }
		);

		for (const cardId of creatorIds) {
			const target = document.querySelector(`[data-card-id="${cardId}"]`);
			if (target) observer.observe(target);
		}

		return () => observer.disconnect();
	}, [creatorIds]);

	return (
		<>
			<Navbar />
			<main className="relative min-h-screen overflow-hidden bg-brand-dark px-4 pb-12 pt-28 text-brand-light sm:px-8 sm:pt-32">
				<div className="pointer-events-none absolute left-0 top-10 h-80 w-80 rounded-full bg-brand-cyan/10 blur-[140px]" />
				<div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand-purple/15 blur-[140px]" />

				<section className="relative mx-auto w-full max-w-7xl">
				<header className="mb-8 rounded-2xl border border-white/10 bg-brand-surface/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
					<p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan/80">
						Creator Spotlight
					</p>
					<h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
						Content Creators You Can Collaborate With
					</h1>
					<p className="mt-2 max-w-3xl text-brand-light/70">
						Temukan kreator dengan audience relevan untuk membantu campaign UMKM
						lebih cepat naik dan lebih tepat sasaran.
					</p>
				</header>

				<div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
					{creators.map((creator, index) => {
						const isVisible = visibleIds.includes(creator.id);

						return (
							<button
								type="button"
								key={creator.id}
								data-card-id={creator.id}
								className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-brand-surface/80 text-left shadow-[0_16px_35px_rgba(2,6,23,0.35)] transition-all duration-500 ${creator.className} ${
									isVisible
										? "translate-y-0 scale-100 opacity-100"
										: "translate-y-8 scale-[0.98] opacity-0"
								} hover:-translate-y-1 hover:border-brand-cyan/40 hover:shadow-[0_24px_60px_rgba(0,240,255,0.18)] active:translate-y-0 active:scale-[0.985] active:shadow-[0_22px_65px_rgba(176,38,255,0.35)]`}
								style={{ transitionDelay: `${index * 70}ms` }}
							>
								<div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${creator.accent}`} />
								<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
								<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-active:opacity-100">
									<div className="absolute -bottom-8 left-1/2 h-36 w-56 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-cyan/35 to-brand-purple/40 blur-3xl" />
								</div>

								<BlankProfile />

								<div className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-medium text-brand-light/85 backdrop-blur-sm">
									{creator.niche}
								</div>

								<div className="absolute bottom-4 left-4 right-4 z-10">
									<p className="mb-2 text-xl font-bold text-brand-light drop-shadow-[0_0_16px_rgba(0,240,255,0.16)]">
										{creator.name}
									</p>
									<div className="inline-flex items-center rounded-full border border-brand-cyan/40 bg-black/55 px-4 py-2 text-sm font-semibold text-brand-cyan shadow-[0_0_22px_rgba(0,240,255,0.2)] backdrop-blur-sm">
										{creator.subscribers}
									</div>
								</div>
							</button>
						);
					})}
				</div>
				</section>
			</main>
		</>
	);
}
