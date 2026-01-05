"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, ShieldCheck, LogOut, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { ProfileInfo } from "./profile-drawer";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menu = [
    { name: "Encrypt", href: "/encrypt" },
    { name: "Decrypt", href: "/decrypt" },
    { name: "History", href: "/history" },
  ];

  return (
    <nav className="border-b bg-background/60 backdrop-blur-xl sticky top-0 z-[100] border-border/40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 group transition-all">
            <div className="p-1.5 rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <span className="font-black text-xl tracking-tighter uppercase italic">
              Crypto<span className="text-primary not-italic">Learn</span>
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {menu.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-xs font-black uppercase tracking-widest transition-all rounded-xl relative group",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute inset-0 bg-primary/10 rounded-xl -z-10 border border-primary/20"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl w-10 h-10 border border-border/20 bg-background/40"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {session?.user && (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-xl p-0 ring-offset-background transition-all hover:ring-2 hover:ring-primary/20 border border-border/20">
                    <Avatar className="h-full w-full rounded-xl">
                      <AvatarImage src={session.user.image || ""} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold rounded-xl text-xs">
                        {session.user.name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 mt-3 p-2 border-border/40 shadow-2xl bg-card/90 backdrop-blur-2xl rounded-2xl" align="end">
                  <DropdownMenuLabel className="font-normal px-2 py-4">
                    <div className="space-y-1">
                      <p className="text-sm font-black leading-none uppercase tracking-tight">{session.user.name}</p>
                      <p className="text-[10px] font-mono leading-none text-muted-foreground break-all">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border/40" />
                  
                  <div className="py-1">
                    <DropdownMenuItem asChild className="cursor-pointer rounded-xl focus:bg-primary/10 focus:text-primary transition-all py-3">
                       <ProfileInfo user={session.user as any} />
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator className="bg-border/40" />
                  
                  <DropdownMenuItem 
                    className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer rounded-xl font-bold py-3 mt-1" 
                    onClick={() => {
                      toast.promise(signOut({ callbackUrl: "/", redirect: true }), {
                        loading: 'De-authenticating...',
                        success: 'Access Revoked!',
                        error: 'Failed to sign out',
                      });
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="uppercase text-xs tracking-widest">Logout Session</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-xl border border-border/20 bg-background/40"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl p-4 space-y-2 pb-8"
          >
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex w-full p-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all",
                  pathname === item.href ? "bg-primary/10 text-primary border border-primary/20" : "hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}