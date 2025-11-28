
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Flag, MessageSquare, Gem } from "lucide-react";
import Link from "next/link";

export default function CommunityModerationPage() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-muted-foreground">
            <ArrowLeft />
            Kembali ke Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold">Moderasi Komunitas</h1>
        <p className="text-muted-foreground mt-1">
          Kelola laporan pelanggaran, review, komentar, dan sistem voting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
             <div className="p-3 bg-destructive/10 rounded-md">
                <Flag className="h-6 w-6 text-destructive" />
            </div>
            <div>
                <CardTitle>Laporan Pelanggaran</CardTitle>
                <CardDescription className="mt-1">Tinjau laporan dari pengguna.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Lihat dan tindak lanjuti laporan mengenai plagiarisme, komentar tidak pantas, atau spam untuk menjaga kesehatan komunitas.
            </p>
            <Button variant="secondary" className="mt-4 w-full" disabled>
              Segera Hadir
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
             <div className="p-3 bg-primary/10 rounded-md">
                <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
                <CardTitle>Review & Komentar</CardTitle>
                <CardDescription className="mt-1">Setujui atau tolak review baru.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Moderasi semua review dan komentar yang masuk untuk memastikan konten sesuai dengan pedoman komunitas platform.
            </p>
             <Button variant="secondary" className="mt-4 w-full" disabled>
              Segera Hadir
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="p-3 bg-yellow-500/10 rounded-md">
                <Gem className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
                <CardTitle>Voting System</CardTitle>
                <CardDescription className="mt-1">Atur Power Stones & voting.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Kelola sistem voting mingguan, atur bobot suara, dan lihat peringkat novel berdasarkan dukungan pembaca.
            </p>
             <Button variant="secondary" className="mt-4 w-full" disabled>
              Segera Hadir
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
