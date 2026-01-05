"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs() {
  const pathname = usePathname();
  
  // Memecah path menjadi array (contoh: /decrypt -> ["decrypt"])
  const segments = pathname.split("/").filter((item) => item !== "");

  if (pathname === "/") return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
        <li className="flex items-center gap-2">
          <Link 
            href="/" 
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <Home className="w-3 h-3" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>
        
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <li key={href} className="flex items-center gap-2">
              <ChevronRight className="w-3 h-3 opacity-30" />
              {isLast ? (
                <span className="text-primary flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  {segment}
                </span>
              ) : (
                <Link href={href} className="hover:text-foreground transition-colors">
                  {segment}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}