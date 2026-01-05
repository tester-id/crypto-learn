import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Skeleton untuk Header Stats */}
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="space-y-4">
          <Skeleton className="h-10 w-64 rounded-xl" />
          <Skeleton className="h-4 w-48 rounded-lg" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-20 w-32 rounded-2xl md:w-40" />
          <Skeleton className="h-20 w-32 rounded-2xl md:w-40" />
          <Skeleton className="hidden sm:block h-20 w-40 rounded-2xl" />
        </div>
      </div>

      {/* Skeleton untuk Workspace / Card Utama */}
      <div className="space-y-6">
        <Skeleton className="h-[400px] w-full rounded-[2rem] border border-border/20" />
        
        {/* Skeleton untuk List History di bawahnya */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}