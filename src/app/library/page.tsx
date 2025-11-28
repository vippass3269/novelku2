"use client";

import { useUser } from "@/contexts/UserContext";
import { novels } from "@/lib/data";
import { NovelCard } from "@/components/novel/NovelCard";
import { Library as LibraryIcon } from "lucide-react";

export default function LibraryPage() {
  const { library } = useUser();
  const libraryNovels = novels.filter((novel) => library.includes(novel.slug));

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <LibraryIcon className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold font-headline">Pustaka Saya</h1>
      </div>
      
      {libraryNovels.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8">
          {libraryNovels.map((novel) => (
            <NovelCard key={novel.id} novel={novel} width={250} height={375} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-card rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Pustaka Anda Kosong</h2>
          <p className="text-muted-foreground">Tambahkan novel ke pustaka untuk membacanya nanti.</p>
        </div>
      )}
    </div>
  );
}
