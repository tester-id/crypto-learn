"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { User, Settings2 } from "lucide-react";
import { ProfileForm } from "./forms/ProfileForm";

interface ProfileInfoProps {
  user: {
    name?: string | null;
    email?: string | null;
    username?: string | null;
  };
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const Content = (
    <div className="py-2">
      <ProfileForm />
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="flex w-full items-center cursor-pointer group">
            <User className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
            <span className="group-hover:translate-x-0.5 transition-transform">Profile Settings</span>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px] border-border/40 bg-card/95 backdrop-blur-xl shadow-2xl">
          <DialogHeader className="flex flex-col items-start gap-1 border-b border-border/40 pb-4">
            <div className="flex items-center gap-2 text-primary">
                <Settings2 className="w-4 h-4" />
                <DialogTitle className="text-xl font-black tracking-tighter uppercase">User Profile</DialogTitle>
            </div>
            <DialogDescription className="text-xs font-medium text-muted-foreground">
              Manage your personal information and security credentials.
            </DialogDescription>
          </DialogHeader>
          {Content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="flex w-full items-center cursor-pointer group">
          <User className="mr-2 h-4 w-4" />
          <span>Profile Settings</span>
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-card/95 backdrop-blur-xl border-t border-border/40">
        <div className="mx-auto w-full max-w-sm">
            <DrawerHeader className="text-left border-b border-border/40 pb-4 mb-2">
                <div className="flex items-center gap-2 text-primary">
                    <Settings2 className="w-4 h-4" />
                    <DrawerTitle className="text-xl font-black tracking-tighter uppercase">User Profile</DrawerTitle>
                </div>
                <DrawerDescription className="text-xs font-medium text-muted-foreground">
                    Manage your personal information below.
                </DrawerDescription>
            </DrawerHeader>
            {Content}
            <DrawerFooter className="pt-4 border-t border-border/40">
                <DrawerClose asChild>
                    <Button variant="outline" className="w-full h-11 rounded-xl font-bold uppercase tracking-widest text-xs">
                        Close Session
                    </Button>
                </DrawerClose>
            </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}