
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Book, PenSquare, MessageSquare } from "lucide-react";
import Link from 'next/link';

interface NavCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function NavCard({ href, icon, title, description }: NavCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full hover:bg-secondary/50 transition-colors hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <div className="p-3 bg-primary/10 rounded-md">
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1 text-sm">{description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <NavCard 
            href="/admin/novels"
            icon={<Book className="h-6 w-6 text-primary" />}
            title="Kelola Novel"
            description="Tambah, edit, dan kelola semua novel di platform."
        />
         <NavCard 
            href="/admin/authors"
            icon={<PenSquare className="h-6 w-6 text-primary" />}
            title="Manajemen Penulis"
            description="Verifikasi penulis baru dan kelola peran penulis."
        />
         <NavCard 
            href="/admin/users"
            icon={<Users className="h-6 w-6 text-primary" />}
            title="Manajemen Pengguna"
            description="Kelola pengguna terdaftar, peran, dan status."
        />
        <NavCard 
            href="/admin/community"
            icon={<MessageSquare className="h-6 w-6 text-primary" />}
            title="Moderasi Komunitas"
            description="Kelola laporan, review, dan sistem voting."
        />
      </div>

       <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Aktivitas Terbaru</h2>
            <Card>
                <CardContent className="p-6">
                    <p className="text-muted-foreground">Belum ada aktivitas terbaru untuk ditampilkan.</p>
                </CardContent>
            </Card>
       </div>
    </div>
  );
}
