"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, Clock, Hash, Trash2, Terminal, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { deleteHistory } from "@/app/actions/history-actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function HistoryList({ items, isFullPage = false }: { items: any[], isFullPage?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const filteredItems = items.filter(item => 
    item.input.toLowerCase().includes(filter.toLowerCase()) || 
    item.method.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete this activity log?")) return;
    setDeletingId(id);
    const result = await deleteHistory(id);
    setDeletingId(null);
    if (result.success) toast.success("Buffer cleared");
    else toast.error(result.message);
  };

  if (!mounted) return null;

  return (
    <div className="w-full space-y-4">
      <Card className={cn(
        "border-border/40 bg-card/20 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col rounded-[2rem]",
        isFullPage ? "h-[65vh] lg:h-[70vh]" : "h-auto" 
      )}>
        {/* Terminal Header */}
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between border-b border-border/40 bg-muted/30 p-6 gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="p-2.5 bg-background/50 rounded-xl border border-border/40">
              <Terminal className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-0.5">
              <CardTitle className="text-sm font-black uppercase tracking-widest">
                {isFullPage ? "System Console" : "Recent Protocols"}
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono text-muted-foreground uppercase">Buffer Synchronized</span>
              </div>
            </div>
          </div>

          {isFullPage ? (
            <div className="relative w-full sm:w-72 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search buffer..." 
                className="h-10 pl-11 bg-background/40 border-border/40 rounded-xl font-mono text-xs focus-visible:ring-primary/30"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          ) : (
            <Button variant="outline" size="sm" asChild className="rounded-full px-6 font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all">
              <Link href="/history">View Full Console</Link>
            </Button>
          )}
        </CardHeader>

        {/* Terminal Body */}
        <CardContent className={cn(
          "p-0 overflow-y-auto no-scrollbar",
          isFullPage ? "flex-1" : "max-h-[500px]"
        )}>
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4 opacity-20">
              <ShieldCheck className="w-16 h-16 stroke-[1]" />
              <p className="text-xs font-mono uppercase tracking-[0.3em]">No Data in Buffer</p>
            </div>
          ) : (
            <div className="divide-y divide-border/20">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className={cn(
                    "group relative p-6 transition-all hover:bg-primary/[0.03] flex flex-col md:flex-row md:items-center gap-6",
                    "animate-in fade-in slide-in-from-bottom-2 duration-300",
                    deletingId === item.id && "opacity-30 blur-sm"
                  )}
                >
                  {/* Status Indicator Bar */}
                  <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-1 transition-all group-hover:w-1.5",
                    item.type === 'encrypt' ? "bg-blue-500" : "bg-primary"
                  )} />

                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge className={cn(
                        "text-[9px] font-black uppercase px-2.5 py-0.5 rounded-md border-none",
                        item.type === 'encrypt' ? "bg-blue-500/10 text-blue-500" : "bg-primary/10 text-primary"
                      )}>
                        {item.type}
                      </Badge>
                      <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                        <Hash className="w-3 h-3 opacity-30" /> {item.method.replace('-', ' ')}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-6 bg-background/40 border border-border/20 p-4 rounded-2xl font-mono">
                      <div className="min-w-0">
                        <span className="text-[8px] uppercase text-muted-foreground/50 block mb-1">Source</span>
                        <p className="text-xs truncate">{item.input}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground/20 hidden sm:block" />
                      <div className="min-w-0">
                        <span className={cn("text-[8px] uppercase block mb-1", item.type === 'encrypt' ? "text-blue-500/50" : "text-primary/50")}>Result</span>
                        <p className={cn("text-xs truncate font-bold", item.type === 'encrypt' ? "text-blue-500" : "text-primary")}>
                          {item.output}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 border-border/10 pt-4 md:pt-0">
                    <div className="flex items-center gap-2 text-muted-foreground/60 font-mono text-[10px] font-bold">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                    </div>
                    {isFullPage && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 rounded-xl text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 transition-colors"
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                      >
                        <Trash2 className={cn("w-4 h-4", deletingId === item.id && "animate-spin")} />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        {/* Terminal Footer */}
        {isFullPage && (
          <div className="px-6 py-3 bg-muted/50 border-t border-border/40 flex justify-between items-center text-[9px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
            <span>Records: {filteredItems.length}</span>
            <span>Kernel: v2.0.4-Stable</span>
          </div>
        )}
      </Card>
    </div>
  );
}