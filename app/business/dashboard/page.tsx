import { EditableCampaign } from "./editable-campaign";
import { BusinessCommissions } from "./business-commissions";
import { CreatorMatches } from "./creator-matches";
import { CampaignButton } from "./campaign-button";

export default function BusinessDashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-dark px-4 py-10 text-brand-light md:px-8">
      <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-brand-purple/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-brand-cyan/15 blur-[140px]" />

      <section className="relative mx-auto w-full max-w-6xl rounded-3xl border border-white/10 bg-brand-surface/70 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl md:p-10">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand-cyan/80 uppercase">Business Dashboard</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-6xl">For Business</h1>
        <p className="mt-3 max-w-2xl text-brand-light/70">
          Manage creator matches and launch campaign briefs with your current brand identity.
        </p>

        <div className="mt-10 space-y-8 md:mt-12">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-[136px_1fr] md:items-center md:gap-7">
            <CampaignButton />
            <EditableCampaign />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-[136px_1fr] md:items-center md:gap-7">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-brand-purple/40 bg-brand-dark/70 text-sm font-semibold text-brand-purple shadow-[0_0_26px_rgba(176,38,255,0.22)] md:mx-0 md:h-34 md:w-34">
              Match
            </div>
            <CreatorMatches />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-[136px_1fr] md:items-start md:gap-7">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-green-500/40 bg-brand-dark/70 text-sm font-semibold text-green-500 shadow-[0_0_26px_rgba(34,197,94,0.22)] md:mx-0 md:h-34 md:w-34">
              Progress
            </div>
            <BusinessCommissions />
          </div>
        </div>
      </section>
    </main>
  );
}
