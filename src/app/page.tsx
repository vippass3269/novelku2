import { genres, novels } from '@/lib/data';
import { NovelCard } from '@/components/novel/NovelCard';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredNovel = novels[0];

  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] my-8 rounded-2xl overflow-hidden">
        <Image
          src={featuredNovel.coverImage.imageUrl}
          alt={`Cover of ${featuredNovel.title}`}
          fill
          data-ai-hint={featuredNovel.coverImage.imageHint}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 flex items-end p-8 md:p-12">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground mb-4 drop-shadow-lg">
              {featuredNovel.title}
            </h1>
            <p className="text-lg text-foreground/80 mb-6 drop-shadow-md">
              {featuredNovel.description}
            </p>
            <Link href={`/novel/${featuredNovel.slug}`}>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Mulai Membaca <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Genre Sections */}
      <div className="space-y-12 my-12">
        {genres.map((genre) => {
          const novelsInGenre = novels.filter((novel) =>
            novel.genreIds.includes(genre.id)
          );
          if (novelsInGenre.length === 0) return null;

          return (
            <section key={genre.id}>
              <h2 className="text-3xl font-bold font-headline mb-6">{genre.name}</h2>
              <div className="relative">
                <ScrollArea>
                  <div className="flex space-x-6 pb-4">
                    {novelsInGenre.map((novel) => (
                      <NovelCard
                        key={novel.id}
                        novel={novel}
                        className="w-[200px]"
                        width={200}
                        height={300}
                      />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
              <Separator className="my-8" />
            </section>
          );
        })}
      </div>
    </div>
  );
}
