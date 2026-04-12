export default function CreatorDashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-dark px-4 py-10 text-brand-light md:px-8">
      <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-brand-purple/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-brand-cyan/15 blur-[140px]" />

      <section className="relative mx-auto w-full max-w-6xl space-y-6">
        <header className="rounded-2xl border border-white/10 bg-brand-surface/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-cyan/80 uppercase">Creator Hub</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Commission Dashboard</h1>
          <p className="mt-2 text-brand-light/70">Track active campaigns, deliverables, and your pending payouts in one place.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-brand-cyan/30 bg-brand-surface/70 p-5">
            <p className="text-sm text-brand-light/70">Active Commissions</p>
            <p className="mt-2 text-3xl font-bold text-brand-cyan">4</p>
          </article>
          <article className="rounded-2xl border border-brand-purple/30 bg-brand-surface/70 p-5">
            <p className="text-sm text-brand-light/70">Awaiting Approval</p>
            <p className="mt-2 text-3xl font-bold text-brand-purple">2</p>
          </article>
          <article className="rounded-2xl border border-green-500 bg-brand-surface/70 p-5">
            <p className="text-sm text-brand-light/70">Pending Payout</p>
            <p className="mt-2 text-3xl font-bold text-green-500">Rp 3.250.000</p>
          </article>
        </div>

        <section className="rounded-2xl border border-white/10 bg-brand-surface/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <h2 className="text-xl font-semibold">Current Commission Queue</h2>
          <div className="mt-4 space-y-3">
            {[
              {
                brand: "LocalBite",
                task: "1x TikTok Review + 1x Story",
                due: "Due in 2 days",
                status: "In Progress",
              },
              {
                brand: "KopiKenangan",
                task: "UGC Product Reel",
                due: "Due in 4 days",
                status: "Script Review",
              },
              {
                brand: "Majoo",
                task: "YouTube Shorts Mention",
                due: "Due in 6 days",
                status: "Ready to Submit",
              },
            ].map((item) => (
              <article
                key={item.brand}
                className="flex flex-col gap-3 rounded-xl border border-white/10 bg-brand-dark/70 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-lg font-semibold">{item.brand}</p>
                  <p className="text-sm text-brand-light/70">{item.task}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-sm text-brand-light/70">{item.due}</p>
                  <p className="text-sm font-semibold text-brand-cyan">{item.status}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
