import { cn } from "@/lib/utils";

export default function AnimatedShinyText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("mx-auto max-w-md text-neutral-600/50 dark:text-neutral-400/50", className)}>
      <span className="inline-block bg-gradient-to-r from-transparent via-white via-50% to-transparent bg-[length:200%_100%] bg-clip-text animate-shimmer">
        {children}
      </span>
    </span>
  );
}