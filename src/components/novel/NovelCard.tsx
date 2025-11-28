import Image from 'next/image';
import Link from 'next/link';
import type { Novel } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface NovelCardProps {
  novel: Novel;
  className?: string;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function NovelCard({ novel, className, aspectRatio = "portrait", width, height }: NovelCardProps) {
  return (
    <div className={cn("space-y-3", className)}>
        <Link href={`/novel/${novel.slug}`}>
            <Card className="overflow-hidden border-0 bg-transparent shadow-none rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
                <CardContent className="p-0">
                <Image
                    src={novel.coverImage.imageUrl}
                    alt={`Cover of ${novel.title}`}
                    width={width}
                    height={height}
                    data-ai-hint={novel.coverImage.imageHint}
                    className={cn(
                        "object-cover transition-all hover:scale-105",
                        aspectRatio === "portrait" ? "aspect-[2/3]" : "aspect-square"
                    )}
                />
                </CardContent>
            </Card>
        </Link>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{novel.title}</h3>
        <p className="text-xs text-muted-foreground">{novel.author}</p>
      </div>
    </div>
  );
}
