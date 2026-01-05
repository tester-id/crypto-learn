import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { HistoryList } from "@/components/crypto/history-list";
import { History, Shield, Activity, Cpu, Database } from "lucide-react"; // Opsional: pastikan lucide-react terpasang
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils"; // <--- TAMBAHKAN BARIS INI

export default async function HistoryPage() {
  const session = await auth();
  
  if (!session?.user?.email) redirect("/login");
  
  const history = await prisma.history.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: 'desc' },
  });

  const totalEncrypt = history.filter(h => h.type === 'encrypt').length;
  const totalDecrypt = history.filter(h => h.type === 'decrypt').length;

  return (
    <div className="container max-w-6xl min-h-[calc(100vh-80px)] mx-auto py-10 px-4 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header & Stats Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20 shadow-inner">
              <Database className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
              Data <span className="text-primary">Saved</span>
            </h1>
          </div>
          <p className="text-muted-foreground font-medium text-sm md:text-base max-w-md">
            Persistent encrypted storage for all cryptographic session buffers.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full lg:w-auto">
          {[
            { label: "Encrypted", val: totalEncrypt, icon: Shield, color: "text-blue-500" },
            { label: "Decrypted", val: totalDecrypt, icon: Activity, color: "text-primary" },
            { label: "System", val: "Online", icon: Cpu, color: "text-green-500", hideOnMobile: true }
          ].map((stat, i) => (
            <div key={i} className={cn(
              "p-4 rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md shadow-sm",
              stat.hideOnMobile && "hidden sm:block"
            )}>
              <div className={cn("flex items-center gap-2 mb-1", stat.color)}>
                <stat.icon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{stat.label}</span>
              </div>
              <p className="text-2xl font-black font-mono tracking-tighter">{stat.val}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* The Scrollable Terminal */}
      <HistoryList items={history} isFullPage={true} />
    </div>
  );
}