import type { Metadata } from "next";
// import { CONFIG } from "src/global-config";

import { HomeView } from "src/sections/home/view";

// ------------------------------------------------------------

export const metadata: Metadata = {
  title: `Booking | Bookly`,
  description:
    "InvvitApp adalah sebuah web-app layanan pembuatan website digital dengan sistem SaaS (Software as a Service).",
};

// ------------------------------------------------------------

export default function Page() {
  return <HomeView />;
}
