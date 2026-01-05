import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CryptoPlayground } from "@/components/crypto/crypto-playground";
import { HistoryList } from "@/components/crypto/history-list";
import { redirect } from "next/navigation";

export default async function DecryptPage() {
  const session = await auth();

  // Proteksi: Jika tidak ada session, arahkan ke login
  if (!session?.user?.email) {
    redirect("/login");
  }

  // Ambil history user (5 terakhir)
  const history = await prisma.history.findMany({
    where: { 
      user: { email: session.user.email } 
    },
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  return (
    // src/app/(dashboard)/encrypt/page.tsx
    <div className="container py-8 space-y-12"> {/* Tambahkan space-y-12 */}
      <CryptoPlayground defaultMode="decrypt" />
      <HistoryList items={history} />
    </div>
  );
}