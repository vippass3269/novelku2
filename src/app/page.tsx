
"use client";
import { novels as initialNovels, genres } from '@/lib/data';
import { NovelCard } from '@/components/novel/NovelCard';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Star, Eye, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Novel } from '@/lib/data';

export default function Home() {
  const [novels, setNovels] = useState<Novel[]>(initialNovels);

  useEffect(() => {
    const handleStorageChange = () => {
        const novelsData = localStorage.getItem('novels_data');
        if (novelsData) {
            setNovels(JSON.parse(novelsData));
        }
    };
    
    if (!localStorage.getItem('novels_data')) {
        localStorage.setItem('novels_data', JSON.stringify(initialNovels));
    } else {
        handleStorageChange();
    }
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };

  }, []);

  const featuredNovels = novels.filter(n => n.isFeatured);
  const allNovels = novels.filter(n => !n.isFeatured);
  const popularNovels = [...novels].sort((a, b) => b.stats.views - a.stats.views).slice(0, 5);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center py-12 md:py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
            Temukan Cerita <span className="text-primary">Favoritmu</span>
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Ribuan novel web dari berbagai genre. Baca cerita yang memikat imajinasimu.
          </p>
        </section>

        <section className="mb-12">
          <Carousel 
            opts={{ loop: true }} 
            className="relative w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {featuredNovels.map((novel) => (
                <CarouselItem key={novel.id} className="md:basis-1/2 lg:basis-1/3">
                  <Link href={`/novel/${novel.slug}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group mx-2">
                      <Image
                        src={novel.coverImage.imageUrl}
                        alt={`Cover of ${novel.title}`}
                        fill
                        data-ai-hint={novel.coverImage.imageHint}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6 text-white">
                        <Badge variant="secondary" className="mb-2 bg-green-500 text-white border-none">Berlanjut</Badge>
                        <h2 className="text-2xl font-bold">{novel.title}</h2>
                        <p className="text-sm text-white/80 mt-1 line-clamp-2">{novel.description}</p>
                        <div className="flex items-center gap-4 text-sm mt-3 text-white/90">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>{novel.stats.rating.toFixed(1)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{(novel.stats.views / 1000).toFixed(0)}k</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{novel.chapters.length} bab</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </section>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-9">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Jelajahi Genre</h2>
              <div className="flex flex-wrap gap-2">
                <Button variant="default" size="sm" className="bg-primary rounded-full">Semua</Button>
                {genres.map((genre) => (
                  <Button key={genre.id} variant="secondary" size="sm" className="rounded-full">
                    {genre.name}
                  </Button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Novel Semua</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8">
                {allNovels.map((novel) => (
                  <NovelCard key={novel.id} novel={novel} width={250} height={375} />
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-3">
            <div className="sticky top-24 bg-secondary/30 p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Populer</h3>
              <div className="space-y-4">
                {popularNovels.map((novel, index) => (
                  <Link href={`/novel/${novel.slug}`} key={novel.id}>
                    <div className="flex items-center gap-4 group">
                      <div className="text-2xl font-bold text-muted-foreground w-8 text-center">{index + 1}</div>
                      <Image
                        src={novel.coverImage.imageUrl}
                        alt={`Cover of ${novel.title}`}
                        width={48}
                        height={64}
                        data-ai-hint={novel.coverImage.imageHint}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <h4 className="font-semibold group-hover:text-primary transition-colors">{novel.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span>{novel.stats.rating.toFixed(1)}</span>
                          <span>&middot;</span>
                          <span>{novel.chapters.length} ch</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
