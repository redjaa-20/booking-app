"use client";

import Link from "next/link";
import { Button } from "src/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { paths } from "src/routes/paths";
import { cn } from "src/lib/utils";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { FlashIcon, Progress03Icon } from "@hugeicons/core-free-icons";

// ------------------------------------------------------------

const NAV_LINKS = [
  {
    name: "Beranda",
    href: paths.dashboard.root,
  },
  {
    name: "Halaman",
    href: paths.dashboard.pages.root,
  },
  {
    name: "Booking",
    href: paths.dashboard.bookings.root,
  },
];

// ------------------------------------------------------------

export function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="h-15 sticky top-0 z-1 flex items-center bg-card">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-5">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold">
              Book<span className="text-indigo-500">ly</span>
            </h1>
          </Link>
          <div className="flex items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative",
                  link.href === pathname &&
                    "before:bg-indigo-500 dark:before:bg-indigo-400 before:absolute before:w-full before:h-1 before:-bottom-3 before:rounded-t-full"
                )}
              >
                <Button variant="ghost" className="rounded-full">
                  {link.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            className="bg-indigo-500 hover:bg-indigo-500/90 dark:bg-indigo-400 dark:hover:bg-indigo-400/90 text-white rounded-full pr-3"
          >
            <HugeiconsIcon icon={FlashIcon} strokeWidth={2} />
            Upgrade Pro
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 hover:bg-transparent rounded-full"
              >
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>RD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-55 rounded-xl">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <HugeiconsIcon icon={Progress03Icon} />
                Tampilan
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
