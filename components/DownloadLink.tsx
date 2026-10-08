"use client";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
export default function DownloadLink({ href, pack, children }: { href: string; pack: string; children: ReactNode }) {
  return <a href={href} className="btn-primary" download onClick={() => trackEvent("printable_download", { pack, file_path: href })}>{children}</a>;
}
