import Link from "next/link";
import { DashboardFooter } from "src/components/dashboard";

// ------------------------------------------------------------

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full">
      <div className="bg-secondary dark:bg-background min-h-dvh flex flex-col">
        <main className="size-full flex-1 flex items-center">{children}</main>
        <footer className="h-10 flex items-center bg-card text-sm">
          <div className="w-full flex items-center justify-between px-4 md:px-6">
            <div>
              <span>
                &copy; {new Date().getFullYear()} Bookly. All rights reserved.
              </span>
            </div>
            <div>
              <span>
                Powered by{" "}
                <Link
                  href="https://threads.com/redjaa__"
                  target="_blank"
                  className="font-semibold"
                >
                  Redjaa
                </Link>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
