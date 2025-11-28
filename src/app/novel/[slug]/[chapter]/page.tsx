"use client"

import { useEffect, useState } from "react";
import { novels } from "@/lib/data";
import { notFound, useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChapterPage({ params }: { params: { slug: string; chapter: string } }) {
  const router = useRouter();
  const { isChapterUnlocked } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const novel = novels.find((n) => n.slug === params.slug);
  if (!novel) {
    notFound();
  }

  const chapterIndex = novel.chapters.findIndex((c) => c.slug === params.chapter);
  if (chapterIndex === -1) {
    notFound();
  }

  const chapter = novel.chapters[chapterIndex];
  const prevChapter = chapterIndex > 0 ? novel.chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < novel.chapters.length - 1 ? novel.chapters[chapterIndex + 1] : null;

  const isUnlocked = !chapter.isLocked || isChapterUnlocked(chapter.id);
  
  if (!isClient) {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-8 w-1/2 mb-12" />
            <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-6 w-full" />
            </div>
        </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Lock className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold mb-2">Bab Terkunci</h1>
        <p className="text-muted-foreground mb-6">Anda harus membuka bab ini untuk dapat membacanya.</p>
        <Button onClick={() => router.push(`/novel/${novel.slug}`)}>Kembali ke Daftar Bab</Button>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-4">{chapter.title}</h1>
      <p className="text-center text-muted-foreground mb-12">{novel.title}</p>
      
      <div className="prose prose-invert prose-lg max-w-none text-foreground/90 prose-p:leading-loose">
        {chapter.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="flex justify-between mt-16">
        {prevChapter ? (
          <Link href={`/novel/${novel.slug}/${prevChapter.slug}`} passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Bab Sebelumnya
            </Button>
          </Link>
        ) : (
          <div />
        )}
        {nextChapter ? (
          <Link href={`/novel/${novel.slug}/${nextChapter.slug}`} passHref>
            <Button variant="outline">
              Bab Berikutnya
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}
