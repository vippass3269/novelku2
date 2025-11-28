
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookUp } from "lucide-react";
import Link from "next/link";

export default function BannerManagementPage() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-muted-foreground">
            <ArrowLeft />
            Kembali ke Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold">Manajemen Banner</h1>
        <p className="text-muted-foreground mt-1">
          Atur novel mana yang akan muncul di slider (carousel) utama halaman depan.
        </p>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Cara Mengatur Banner</CardTitle>
          <CardDescription>
            Novel yang ditandai sebagai "Unggulan" akan secara otomatis tampil di banner halaman depan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start gap-4 rounded-lg border p-6">
              <p>
                Untuk mengubah novel mana yang menjadi unggulan, buka halaman <strong>Kelola Novel</strong>, lalu klik tombol edit pada novel yang diinginkan. Di dalam formulir edit, aktifkan pilihan <strong>"Tampilkan di Beranda"</strong>.
              </p>
              <Button asChild>
                  <Link href="/admin/novels">
                    <BookUp className="mr-2 h-4 w-4"/>
                    Buka Kelola Novel
                  </Link>
              </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
