export default function AboutUs() {
  return (
    <section id="about-us" className="relative overflow-hidden scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8">
      {/* Glow effect */}
      <div className="pointer-events-none absolute top-16 left-[14%] h-56 w-56 rounded-full bg-brand-cyan/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-[12%] bottom-10 h-64 w-64 rounded-full bg-brand-purple/12 blur-[130px]" />

      <div className="relative mx-auto grid min-h-[66vh] max-w-7xl gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.24em] text-brand-light/45 uppercase">About Us</p>
          <h2 className="mt-4 text-5xl leading-[1.02] font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Product-Led
            <br />
            Collaboration.
            <br />
            Faster Campaign
            <br />
            Execution.
          </h2>
        </div>

        <div className="flex flex-col justify-end lg:pb-5">
          <p className="max-w-2xl text-lg leading-relaxed text-brand-light/52 sm:text-xl">
            Kami membangun platform kolaborasi untuk membantu UMKM menemukan kreator yang tepat,
            menjalankan campaign lebih cepat, dan memantau hasilnya dengan lebih terukur. Fokusnya
            sederhana: workflow yang ringkas, outcome yang jelas, dan pertumbuhan yang konsisten.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-lg font-semibold text-brand-light/88">
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 transition-colors hover:text-brand-cyan"
            >
              <span className="text-brand-cyan/80 transition-transform group-hover:translate-x-1">
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
              Explore Services
            </a>
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 transition-colors hover:text-brand-purple"
            >
              <span className="text-brand-purple/85 transition-transform group-hover:translate-x-1">
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
              Book Discovery Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}