type Company = {
	name: string;
	path: string;
	hoverClass: string;
	glowClass: string;
};

// Daftar brand yang ditampilkan di belt horizontal.
const companies: Company[] = [
	{
		name: "LocalBite",
		path: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
		hoverClass: "hover:text-brand-cyan",
		glowClass: "group-hover/logo:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]",
	},
	{
		name: "KopiKenangan",
		path: "M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z",
		hoverClass: "hover:text-brand-purple",
		glowClass: "group-hover/logo:drop-shadow-[0_0_8px_rgba(176,38,255,0.8)]",
	},
	{
		name: "Tokopedia",
		path: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
		hoverClass: "hover:text-brand-pink",
		glowClass: "group-hover/logo:drop-shadow-[0_0_8px_rgba(255,0,60,0.8)]",
	},
	{
		name: "Gojek",
		path: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
		hoverClass: "hover:text-brand-cyan",
		glowClass: "group-hover/logo:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]",
	},
	{
		name: "Flip",
		path: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
		hoverClass: "hover:text-brand-purple",
		glowClass: "group-hover/logo:drop-shadow-[0_0_8px_rgba(176,38,255,0.8)]",
	},
	{
		name: "Majoo",
		path: "M13 10V3L4 14h7v7l9-11h-7z",
		hoverClass: "hover:text-brand-pink",
		glowClass: "group-hover/logo:drop-shadow-[0_0_8px_rgba(255,0,60,0.8)]",
	},
];

function BeltSet({ suffix }: { suffix: string }) {
	return (
		// 1 set item logo dirender 2x untuk efek infinite scroll
		<div className="flex w-max min-w-[100vw] flex-shrink-0 items-center justify-around gap-10 whitespace-nowrap px-4 sm:gap-16 sm:px-8 lg:gap-24">
			{companies.map((company) => (
				<div
					key={`${company.name}-${suffix}`}
					className={`group/logo flex cursor-pointer items-center gap-2 text-white/30 transition-all duration-300 ${company.hoverClass}`}
				>
					<svg
						className={`h-8 w-8 opacity-60 transition-all group-hover/logo:opacity-100 ${company.glowClass}`}
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d={company.path} />
					</svg>
					<span className="text-xl font-bold tracking-tight opacity-80 group-hover/logo:opacity-100">
						{company.name}
					</span>
				</div>
			))}
		</div>
	);
}

export default function CompanyBelt() {
	return (
		<section className="relative overflow-hidden border-y border-white/5 bg-brand-surface/30 py-12">
			{/* Gradient mask kiri-kanan biar transisi logo lebih halus */}
			<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-brand-dark to-transparent md:w-48" />
			<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-brand-dark to-transparent md:w-48" />

			<div className="mx-auto mb-8 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
				<p className="text-xs font-semibold tracking-[0.2em] text-brand-light/40 uppercase sm:text-sm">
					Dipercaya oleh Brand Lokal & UMKM
				</p>
			</div>

			{/* 2 set logo identik biar infinite loop */}
			<div className="group flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
				<BeltSet suffix="a" />
				<BeltSet suffix="b" />
			</div>
		</section>
	);
}
