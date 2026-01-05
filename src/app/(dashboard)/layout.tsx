import { Navbar } from "@/components/navbar";
import { Breadcrumbs } from "@/components/breadcrumbs"; // Import di sini

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Navbar />
      <main className="flex-1 flex flex-col relative">
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-6xl h-full opacity-30 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent blur-3xl" />
        </div>
        
        <div className="container mx-auto py-6 px-4 flex-1">
          {/* Tambahkan Breadcrumbs di sini */}
          <Breadcrumbs /> 
          
          {children}
        </div>
      </main>
    </div>
  );
}