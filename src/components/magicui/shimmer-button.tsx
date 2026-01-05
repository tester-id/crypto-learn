import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ShimmerButton({ className, children, href, background = "#000", ...props }: any) {
  const content = (
    <div className={cn("group relative flex cursor-pointer items-center justify-center rounded-full border border-white/10 px-6 py-3 text-white transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]", className)} style={{ background }} {...props}>
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="animate-shimmer absolute -inset-[100%] bg-[conic-gradient(from_90deg_at_50%_50%,#e1e1e1_0%,#393939_50%,#e1e1e1_100%)] opacity-20" />
      </div>
      <div className="z-10">{children}</div>
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}