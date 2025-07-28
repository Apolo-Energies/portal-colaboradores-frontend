import { Header } from "@/components/ui/Header";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { Alert } from "@/components/ui/Alert";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden bg-body overflow-y-auto px-6 pt-2 pb-6">
          {children}
        </main>
      </div>
      <LoadingOverlay />
      <Alert />
    </div>
  );
}
