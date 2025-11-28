
"use client";

import { useState, useMemo, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { novels } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, ArrowLeft, Image as ImageIcon, CalendarIcon, Lock } from "lucide-react";
import Image from "next/image";

// This page is now client-side, but the route is dynamic.
// For `output: export`, we need to tell Next.js which slugs to generate.
// In a real app, you might not pre-render this for all novels
// but for this project structure, it's needed.
export async function generateStaticParams() {
  return novels.map((novel) => ({
    slug: novel.slug,
  }));
}

export default function AddChapterPage({ params }: { params: { slug: string } }) {
  const router = useRouter();

  const novel = useMemo(() => novels.find((n) => n.slug === params.slug), [params.slug]);

  if (!novel) {
    notFound();
  }

  const nextChapterNumber = novel.chapters.length + 1;
  const isFree = nextChapterNumber <= 10;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [illustration, setIllustration] = useState<File | null>(null);
  const [illustrationPreview, setIllustrationPreview] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(true);

  const wordCount = useMemo(() => {
    if (!content) return 0;
    return content.trim().split(/\s+/).length;
  }, [content]);

  useEffect(() => {
    if (!illustration) {
      setIllustrationPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(illustration);
    setIllustrationPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [illustration]);

  const handleBack = () => {
    router.push(`/admin/novels/${novel.slug}`);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-background w-full max-w-4xl h-full flex flex-col">
        <header className="p-4 flex items-center justify-between border-b shrink-0">
          <h1 className="text-lg font-semibold">Tambah Chapter {nextChapterNumber}</h1>
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <X className="h-4 w-4" />
          </Button>
        </header>

        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-1">
              <Label htmlFor="chapter-number">Nomor Chapter</Label>
              <div className="relative mt-2">
                 <Input id="chapter-number" type="number" value={nextChapterNumber} readOnly className="pr-10" />
                 <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="chapter-title">Judul Chapter *</Label>
              <Input
                id="chapter-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul chapter"
                className="mt-2"
              />
            </div>
          </div>
          
          <Alert variant={isFree ? "default" : "destructive"} className={`mb-6 ${isFree ? 'bg-green-950/50 border-green-500/20' : 'bg-transparent'}`}>
            <Lock className={`h-4 w-4 ${isFree ? 'text-green-400' : 'text-primary'}`} />
            <AlertDescription className={isFree ? 'text-green-300' : 'text-primary'}>
              {isFree
                ? "Chapter ini akan GRATIS untuk pembaca."
                : `Chapter ini akan berbayar sebesar ${novel.chapters.find(c => c.cost > 0)?.cost || 10} koin.`}
            </AlertDescription>
          </Alert>

          <div>
            <Label htmlFor="chapter-content">Konten Chapter *</Label>
            <div className="mt-2 relative rounded-md border border-input focus-within:ring-2 focus-within:ring-ring">
              <Textarea
                id="chapter-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Mulai tulis ceritamu di sini..."
                className="min-h-[400px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className="absolute bottom-2 right-3 text-xs text-muted-foreground">
                Jumlah kata: {wordCount}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Label>Ilustrasi Chapter</Label>
            <div className="flex items-center justify-between p-3 rounded-md border border-dashed">
                <div className="flex items-center gap-3">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                        {illustration ? illustration.name : "Belum ada gambar yang diunggah"}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {illustration && (
                        <Button variant="ghost" size="sm" onClick={() => setIllustration(null)}>Hapus</Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                        <label htmlFor="illustration-upload" className="cursor-pointer">
                            Pilih Gambar
                            <input id="illustration-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => setIllustration(e.target.files?.[0] || null)} />
                        </label>
                    </Button>
                </div>
            </div>
            {illustrationPreview && (
                <div className="mt-2 relative w-full aspect-video rounded-md overflow-hidden border">
                    <Image src={illustrationPreview} alt="Preview Ilustrasi" layout="fill" objectFit="contain" />
                </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="publish-switch" className="font-medium">Terbitkan Chapter</Label>
              <p className="text-sm text-muted-foreground">Chapter yang diterbitkan akan terlihat oleh pembaca.</p>
            </div>
            <Switch id="publish-switch" checked={isPublished} onCheckedChange={setIsPublished} />
          </div>

        </main>
        
        <footer className="p-4 flex justify-end gap-2 border-t bg-secondary/30 shrink-0">
          <Button variant="ghost" onClick={handleBack}>Batal</Button>
          <Button>Simpan Chapter</Button>
        </footer>
      </div>
    </div>
  );
}
