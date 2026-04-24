import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminOverview } from "@/lib/auth-store";
import AdminDashboardClient, { type AdminOverviewData } from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session")?.value;

  if (!adminSession) {
    redirect("/admin");
  }

  let initialOverview: AdminOverviewData | null = null;
  let initialOverviewError = "";

  try {
    initialOverview = await getAdminOverview();
  } catch {
    initialOverviewError = "Unable to load dashboard data.";
  }

  return (
    <AdminDashboardClient
      initialOverview={initialOverview}
      initialOverviewError={initialOverviewError}
    />
  );
}
