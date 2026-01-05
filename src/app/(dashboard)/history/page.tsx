import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { HistoryList } from "@/components/crypto/history-list";
import { History, Shield, Activity, Cpu } from "lucide-react";
import { redirect } from "next/navigation";

export default async function HistoryPage() {
  const session = await auth();
  
  if (!session?.user?.email) {
    redirect("/login");
  }
  
  const history = await prisma.history.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: 'desc' },
  });

  const totalEncrypt = history.filter(h => h.type === 'encrypt').length;
  const totalDecrypt = history.filter(h => h.type === 'decrypt').length;

  return (
    // min-h-[calc(100vh-64px)] accounts for the navbar height
    <div className="container mx-auto max-w-6xl min-h-[calc(100vh-80px)] flex flex-col justify-center py-8 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <History className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">Data Archives</h1>
          </div>
          <p className="text-muted-foreground ml-1 font-medium text-sm md:text-base">
            Persistent storage of all cryptographic operations.
          </p>
        </div>

        {/* System Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="p-3 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm shadow-sm">
            <div className="flex items-center gap-2 text-blue-500 mb-1">
              <Shield className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted</span>
            </div>
            <p className="text-2xl font-black font-mono leading-none">{totalEncrypt}</p>
          </div>
          <div className="p-3 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm shadow-sm">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Activity className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Decrypted</span>
            </div>
            <p className="text-2xl font-black font-mono leading-none">{totalDecrypt}</p>
          </div>
          <div className="hidden sm:block p-3 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm shadow-sm">
            <div className="flex items-center gap-2 text-green-500 mb-1">
              <Cpu className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Status</span>
            </div>
            <p className="text-xl font-black font-mono leading-none uppercase text-green-500">Online</p>
          </div>
        </div>
      </div>
      
      <HistoryList items={history} isFullPage={true} />
    </div>
  );
}