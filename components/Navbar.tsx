"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-brand-dark/80 backdrop-blur-lg transition-all duration-300">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-20 items-center justify-between">
					<Link
						href="/"
						className="group flex cursor-pointer items-center gap-2 flex-shrink-0"
					>
						<div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-brand-cyan to-brand-purple shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(176,38,255,0.6)]">
							<svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
						</div>
						<span className="bg-gradient-to-r from-white to-brand-light bg-clip-text text-xl font-bold tracking-wide text-transparent transition-all duration-300 group-hover:from-brand-cyan group-hover:to-brand-purple">
							Nama
						</span>
					</Link>

					<div className="hidden items-center space-x-8 md:flex">
						<Link
							href="#"
							className="text-sm font-medium text-brand-light transition-all duration-300 hover:text-brand-cyan hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
						>
							Creators
						</Link>
						<Link
							href="#"
							className="text-sm font-medium text-brand-light transition-all duration-300 hover:text-brand-purple hover:drop-shadow-[0_0_8px_rgba(176,38,255,0.8)]"
						>
							About Us
						</Link>

						<div className="group relative">
							<button className="group flex items-center gap-1 py-2 text-sm font-medium text-brand-light transition-colors duration-300 group-hover:text-brand-pink">
								Apply
								<svg
									className="h-4 w-4 text-brand-light transition-transform group-hover:rotate-180 group-hover:text-brand-pink"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>

							<div className="invisible absolute top-full left-0 mt-2 w-56 translate-y-2 overflow-hidden rounded-xl border border-white/10 bg-brand-surface opacity-0 shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all duration-300 origin-top group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
								<div className="flex flex-col py-2">
									<Link href="#" className="group/item flex flex-col px-4 py-3 transition-colors hover:bg-brand-dark">
										<span className="text-sm font-bold text-white transition-colors group-hover/item:text-brand-cyan">
											Apply as Creator
										</span>
										<span className="mt-0.5 text-xs text-brand-light/70">Jadi micro-influencer kami</span>
									</Link>
									<div className="mx-4 h-px bg-white/5" />
									<Link href="#" className="group/item flex flex-col px-4 py-3 transition-colors hover:bg-brand-dark">
										<span className="text-sm font-bold text-white transition-colors group-hover/item:text-brand-purple">
											Apply for Business
										</span>
										<span className="mt-0.5 text-xs text-brand-light/70">Dapatkan exposure maksimal</span>
									</Link>
								</div>
							</div>
						</div>

						<Link
							href="/contact"
							className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-brand-surface px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:border-brand-cyan/50 hover:bg-brand-dark hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
						>
							<span className="relative z-10">Contact Us</span>
							<div className="absolute inset-0 h-full w-full bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
						</Link>
					</div>

					<div className="flex items-center md:hidden">
						<button
							aria-label="Toggle mobile menu"
							aria-expanded={isMenuOpen}
							onClick={() => setIsMenuOpen((prev) => !prev)}
							className="p-2 text-brand-light transition-colors hover:text-brand-cyan focus:outline-none"
						>
							<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>

			<div
				className={`absolute top-20 left-0 w-full border-b border-white/10 bg-brand-surface/95 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] md:hidden ${
					isMenuOpen ? "block animate-[fadeIn_0.2s_ease-out]" : "hidden"
				}`}
			>
				<div className="space-y-2 px-4 pt-4 pb-6">
					<Link
						href="#"
						className="block rounded-xl px-4 py-3 text-base font-semibold text-brand-light transition-all hover:bg-brand-dark hover:text-brand-cyan"
					>
						Creators
					</Link>
					<Link
						href="#"
						className="block rounded-xl px-4 py-3 text-base font-semibold text-brand-light transition-all hover:bg-brand-dark hover:text-brand-purple"
					>
						About Us
					</Link>

					<div className="mt-4 border-t border-white/10 pt-3 pb-2">
						<p className="mb-3 px-4 text-xs font-bold tracking-widest text-brand-light/40 uppercase">
							Apply Now
						</p>
						<Link
							href="#"
							className="ml-1 block rounded-r-xl border-l-2 border-transparent px-4 py-3 pl-3 text-sm font-medium text-brand-light transition-all hover:border-brand-cyan hover:bg-brand-dark hover:text-brand-cyan"
						>
							As Content Creator
						</Link>
						<Link
							href="#"
							className="mt-1 ml-1 block rounded-r-xl border-l-2 border-transparent px-4 py-3 pl-3 text-sm font-medium text-brand-light transition-all hover:border-brand-purple hover:bg-brand-dark hover:text-brand-purple"
						>
							For Business (UMKM)
						</Link>
					</div>

					<div className="mt-6 border-t border-white/10 pt-4">
						<Link
							href="/contact"
							className="block w-full rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple px-4 py-3.5 text-center text-base font-bold text-white shadow-[0_0_15px_rgba(176,38,255,0.3)] transition-transform active:scale-95"
						>
							Contact Us
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
