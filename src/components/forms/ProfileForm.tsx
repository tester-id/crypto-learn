"use client";

import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Shield, BadgeCheck, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProfileForm() {
  const { data: session } = useSession();
  const user = session?.user;

  const infoFields = [
    {
      label: "Full Name",
      value: user?.name || "Not set",
      icon: <User className="w-4 h-4 text-muted-foreground" />,
    },
    {
      label: "Email Address",
      value: user?.email || "Not set",
      icon: <Mail className="w-4 h-4 text-muted-foreground" />,
    },
    {
      label: "Username",
      value: user?.username ? `@${user.username}` : "@user",
      icon: <Shield className="w-4 h-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="space-y-6 px-4 py-2">
      {/* Profile Header */}
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 backdrop-blur-sm">
        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold text-2xl shadow-inner">
          {user?.name?.[0] || "U"}
        </div>
        <div className="space-y-0.5">
          <h4 className="text-sm font-bold flex items-center gap-1.5 tracking-tight">
            {user?.name} 
            <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/10" />
          </h4>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
            Verified User
          </p>
        </div>
      </div>

      {/* Info Fields */}
      <div className="grid gap-5">
        {infoFields.map((field, index) => (
          <div key={index} className="space-y-2 group">
            <Label className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/60 ml-1">
              {field.label}
            </Label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 transition-colors group-focus-within:text-primary z-10">
                {field.icon}
              </div>
              <Input
                readOnly
                value={field.value}
                className={cn(
                  "pl-11 h-12 bg-muted/20 border-border/40 rounded-xl focus-visible:ring-primary/20",
                  "cursor-default font-medium text-sm transition-all group-hover:bg-muted/30"
                )}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Security Footer */}
      <div className="p-3 rounded-xl bg-muted/40 border border-border/40 flex items-center gap-3">
        <Fingerprint className="w-5 h-5 text-primary/40 shrink-0" />
        <p className="text-[10px] text-muted-foreground/80 leading-relaxed font-mono uppercase tracking-tighter">
          This data is synchronized with your secure CryptoLearn identity provider.
        </p>
      </div>
    </div>
  );
}