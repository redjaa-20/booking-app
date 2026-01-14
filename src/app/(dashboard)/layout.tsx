import { DashboardFooter, DashboardHeader } from "src/components/dashboard";
import { Toaster } from "src/components/ui/sonner";

// ------------------------------------------------------------

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full">
      <div className="bg-secondary dark:bg-background min-h-dvh flex flex-col">
        <DashboardHeader />
        <main className="size-full flex-1 py-6">{children}</main>
        <DashboardFooter />
        <Toaster />
      </div>
    </div>
  );
}
