import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ISO Certificates | SRK Metals FZE-LLC | SRK Bolt UAE",
  description: "View the ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 management system certificates issued to SRK Metals FZE-LLC and access the original PDF documents.",
  alternates: { canonical: "https://www.srkbolt.com/certificates" },
};

export default function CertificatesLayout({ children }: { children: ReactNode }) {
  return children;
}
