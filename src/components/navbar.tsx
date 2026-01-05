"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, ShieldCheck, LogOut, User, Activity } from "lucide-react";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
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

export function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const menu = [
    { name: "Encrypt", href: "/encrypt" },
    { name: "Decrypt", href: "/decrypt" },
    { name: "History", href: "/history" },
  ];

  return (
    <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50 border-border/40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary tracking-tighter">
            <ShieldCheck className="w-6 h-6" />
            <span className="hidden sm:inline">CryptoLearn</span>
          </Link>
          
          <div className="hidden md:flex gap-1">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-semibold transition-all rounded-lg relative",
                  pathname === item.href 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-9 h-9"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {session?.user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-primary/20">
                  <Avatar className="h-9 w-9 border border-border/50">
                    <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {session.user.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 mt-2 p-2 border-border/40 shadow-2xl bg-card/95 backdrop-blur-lg" align="end" forceMount>
                <DropdownMenuLabel className="font-normal px-2 py-3">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none tracking-tight">{session.user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground italic">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="opacity-50" />
                
                <DropdownMenuItem 
                  onSelect={(e) => e.preventDefault()} 
                  className="cursor-pointer rounded-md focus:bg-primary/10 focus:text-primary transition-colors"
                >
                  <ProfileInfo user={session.user as any} />
                </DropdownMenuItem>

                <DropdownMenuSeparator className="opacity-50" />
                
                <DropdownMenuItem 
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer rounded-md font-medium" 
                  onClick={() => {
                    toast.promise(
                      signOut({ callbackUrl: "/", redirect: true }), 
                      {
                        loading: 'Signing out...',
                        success: 'Successfully signed out!',
                        error: 'Sign out failed',
                      }
                    );
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}