import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CryptoPlayground } from "@/components/crypto/crypto-playground";
import { HistoryList } from "@/components/crypto/history-list";
import { redirect } from "next/navigation";
import { Shield, Zap, Lock } from "lucide-react";

export default async function EncryptPage() {
  const session = await auth();
  
  if (!session?.user?.email) redirect("/login");

  const history = await prisma.history.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  // UX: Quick Stats to give user a sense of progress
  const totalLogs = await prisma.history.count({
    where: { user: { email: session.user.email }, type: 'encrypt' }
  });

  return (
    <div className="container max-w-7xl py-10 space-y-16 animate-in fade-in duration-700 mx-auto">
      {/* Page Header & Stats Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-2">
        <div className="space-y-1">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary/60">Security Suite</h2>
          <p className="text-muted-foreground text-sm font-medium">Create secure ciphers using advanced classic protocols.</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none p-3 px-6 rounded-2xl bg-card/40 border border-border/40 backdrop-blur-sm flex items-center gap-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Lock className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total Encrypted</p>
              <p className="text-xl font-black font-mono">{totalLogs}</p>
            </div>
          </div>
        </div>
      </div>

      <CryptoPlayground defaultMode="encrypt" />
      
      <section className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <Zap className="w-4 h-4 text-primary" />
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Recent Buffer Activity</h3>
        </div>
        <HistoryList items={history} />
      </section>
    </div>
  );
}