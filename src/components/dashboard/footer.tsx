import Link from "next/link";

// ------------------------------------------------------------

export function DashboardFooter() {
  return (
    <footer className="h-10 flex items-center bg-card text-sm">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6">
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
  );
}
