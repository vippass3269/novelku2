import { novels } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import AddToLibraryButton from "./_components/AddToLibraryButton";
import ChapterList from "./_components/ChapterList";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  return novels.map((novel) => ({
    slug: novel.slug,
  }));
}

export default function NovelPage({ params }: { params: { slug: string } }) {
  const novel = novels.find((n) => n.slug === params.slug);

  if (!novel) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="grid md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-4 lg:col-span-3">
          <div className="sticky top-24">
            <Image
              src={novel.coverImage.imageUrl}
              alt={`Cover of ${novel.title}`}
              width={400}
              height={600}
              data-ai-hint={novel.coverImage.imageHint}
              className="rounded-lg shadow-lg w-full"
              priority
            />
            <AddToLibraryButton novelSlug={novel.slug} />
          </div>
        </div>
        <div className="md:col-span-8 lg:col-span-9">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{novel.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">oleh {novel.author}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {novel.genreIds.map(id => (
                <Badge key={id} variant="secondary">
                    {id}
                </Badge>
            ))}
          </div>

          <p className="text-lg leading-relaxed text-foreground/80 mb-8">{novel.description}</p>
          
          <Separator className="bg-border/50" />

          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4">Daftar Bab</h2>
            <ChapterList novel={novel} />
          </div>
        </div>
      </div>
    </div>
  );
}
