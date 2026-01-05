import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CryptoPlayground } from "@/components/crypto/crypto-playground";
import { HistoryList } from "@/components/crypto/history-list";

export default async function EncryptPage() {
  const session = await auth();
  
  // Ambil history user (5 terakhir)
  const history = session?.user?.email 
  ? await prisma.history.findMany({
      where: { user: { email: session.user.email } },
      orderBy: { createdAt: 'desc' },
      take: 5
    })
  : [];

  return (
    <div className="container py-8 space-y-12"> {/* Tambahkan space-y-12 */}
      <CryptoPlayground defaultMode="encrypt" />
      <HistoryList items={history} />
    </div>
  );
}