import type { Metadata } from "next";

import { RegisterView } from "src/sections/auth/register/view";

// ------------------------------------------------------------

export const metadata: Metadata = {
  title: `Buat Akun | Bookly`,
  description:
    "InvvitApp adalah sebuah web-app layanan pembuatan website digital dengan sistem SaaS (Software as a Service).",
};

// ------------------------------------------------------------

export default function Page() {
  return <RegisterView />;
}
