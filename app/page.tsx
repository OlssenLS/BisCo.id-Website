import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CompanyBelt from "@/components/CompanyBelt";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-dark text-brand-light">
      <Navbar />
      <Hero />
      <CompanyBelt />
    </div>
  );
}
