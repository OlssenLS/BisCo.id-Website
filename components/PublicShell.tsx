import Navbar from "@/components/Navbar";

type PublicShellProps = {
  children: React.ReactNode;
};

export default function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-dark text-brand-light">
      {/* Navbar */}
      <Navbar />

      {/* Spacer untuk navbar fixed */}
      <div aria-hidden="true" className="h-20" />

      {children}
    </div>
  );
}
