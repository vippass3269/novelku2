
import { novels } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Settings2, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ManageNovelChaptersPage({ params }: { params: { slug: string } }) {
  const novel = novels.find((n) => n.slug === params.slug);

  if (!novel) {
    notFound();
  }

  const freeChapters = novel.chapters.filter(c => c.cost === 0).length;
  const coinCost = novel.chapters.find(c => c.cost > 0)?.cost || 0;

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
            <div>
                <Button variant="ghost" className="mb-4" asChild>
                    <Link href="/admin/novels" className="flex items-center gap-2 text-muted-foreground">
                        <ArrowLeft />
                        Kembali
                    </Link>
                </Button>
                <h1 className="text-3xl md:text-4xl font-bold">{novel.title}</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                    {novel.chapters.length} chapter • {freeChapters} chapter gratis • {coinCost > 0 ? `${coinCost} koin/chapter` : 'Gratis'}
                </p>
            </div>
            <Button size="lg" asChild>
              <Link href={`/admin/novels/${novel.slug}/new`}>
                <Plus className="mr-2 h-5 w-5" />
                Tambah Chapter
              </Link>
            </Button>
        </div>

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 flex items-start gap-4 mb-8">
            <Settings2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <div>
                <h3 className="font-semibold text-lg">Pengaturan Monetisasi</h3>
                <p className="text-muted-foreground mt-1">
                    Chapter 1-{freeChapters} akan gratis untuk pembaca. Mulai chapter {freeChapters + 1}, pembaca perlu membayar {coinCost} koin per chapter. Anda bisa mengubah pengaturan ini di halaman edit novel.
                </p>
            </div>
        </div>

        <Card>
            <CardContent className="p-0">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[50px] pl-6">No.</TableHead>
                    <TableHead className="w-[40%]">Judul Chapter</TableHead>
                    <TableHead>Kata</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center pr-6">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {novel.chapters.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6}>
                                <div className="flex flex-col items-center justify-center text-center py-16">
                                    <FileText className="w-16 h-16 text-muted-foreground/50 mb-4" />
                                    <h3 className="text-xl font-semibold text-muted-foreground">Belum ada chapter</h3>
                                    <p className="text-muted-foreground">Klik "Tambah Chapter" untuk mulai menulis.</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        <></> 
                    )}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
