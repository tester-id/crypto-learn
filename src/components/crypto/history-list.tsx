"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, Clock, Hash, Trash2, Terminal, ShieldCheck, Search } from "lucide-react";
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
    if (result.success) toast.success("Log entry deleted successfully");
    else toast.error(result.message);
  };

  if (!mounted) return null;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 p-2"> {/* Added mx-auto here */}
      <Card className={cn(
        "border-border/40 bg-card/30 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col",
        isFullPage ? "h-[65vh] md:h-[70vh]" : "h-auto" 
      )}>
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between border-b border-border/40 bg-muted/20 pb-4 pt-4 gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Terminal className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold tracking-tight">
                {isFullPage ? "Encrypted Data Stream" : "Recent Protocols"}
              </CardTitle>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                Status: {items.length > 0 ? "Data Loaded" : "Idle"}
              </p>
            </div>
          </div>

          {isFullPage ? (
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input 
                placeholder="Search logs..." 
                className="h-8 pl-9 text-xs bg-background/50 border-border/40"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          ) : items.length >= 5 && (
            <Button variant="ghost" size="sm" asChild className="h-8 text-xs font-bold hover:bg-primary/10 hover:text-primary">
              <Link href="/history" className="flex items-center gap-1">
                OPEN CONSOLE <ChevronRight className="w-3 h-3" />
              </Link>
            </Button>
          )}
        </CardHeader>

        <CardContent className={cn(
          "p-0 divide-y divide-border/30 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent",
          isFullPage ? "flex-1" : "h-auto"
        )}>
          {filteredItems.length === 0 ? (
            <div className="p-20 text-center space-y-2">
              <Terminal className="w-10 h-10 text-muted-foreground/20 mx-auto" />
              <p className="text-sm text-muted-foreground font-mono">No matching records found in local buffer.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div 
                key={item.id} 
                className={cn(
                  "group relative flex flex-col md:flex-row justify-between items-start md:items-center p-5 transition-all hover:bg-primary/[0.02]",
                  deletingId === item.id && "opacity-50 grayscale"
                )}
              >
                <div className={cn(
                  "absolute left-0 top-0 bottom-0 w-[3px]",
                  item.type === 'encrypt' ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "bg-primary shadow-[0_0_10px_rgba(196,167,231,0.5)]"
                )} />

                <div className="space-y-4 w-full md:w-3/4">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={cn(
                      "text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 border-none",
                      item.type === 'encrypt' ? "bg-blue-500/10 text-blue-500" : "bg-primary/10 text-primary"
                    )}>
                      {item.type}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-muted-foreground">
                      <Hash className="w-3 h-3" />
                      <span className="uppercase tracking-widest">{item.method.replace('-', ' ')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-4 w-full bg-black/5 dark:bg-white/5 p-3 rounded-lg border border-border/20">
                    <div className="overflow-hidden">
                      <p className="text-[9px] uppercase text-muted-foreground/70 font-black mb-1 tracking-widest">Raw_Buffer</p>
                      <p className="text-sm font-mono truncate leading-none">{item.input}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/30 hidden sm:block" />
                    <div className="overflow-hidden">
                      <p className={cn("text-[9px] uppercase font-black mb-1 tracking-widest", item.type === 'encrypt' ? "text-blue-400" : "text-primary")}>
                        Output_Hash
                      </p>
                      <p className={cn("text-sm font-mono truncate leading-none font-bold", item.type === 'encrypt' ? "text-blue-500" : "text-primary")}>
                        {item.output}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0 self-end md:self-center">
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono font-bold">
                      <Clock className="w-3 h-3 text-primary/50" />
                      {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: enUS })}
                    </div>
                  </div>
                  {isFullPage && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-xl text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-all"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                    >
                      <Trash2 className={cn("w-4 h-4", deletingId === item.id && "animate-spin")} />
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
        {isFullPage && (
          <div className="px-4 py-2 bg-muted/30 border-t border-border/40 flex justify-between items-center text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            <span>Total Buffer: {filteredItems.length} Entries</span>
            <span className="animate-pulse flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> System Sync: OK
            </span>
          </div>
        )}
      </Card>
    </div>
  );
}