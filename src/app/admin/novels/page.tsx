
"use client";

import { novels, genres } from "@/lib/data";
import type { Novel } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Plus, BookUp, FilePenLine, Trash2, ShieldAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EditNovelSheet } from "./_components/EditNovelSheet";

const genreMap = new Map(genres.map(g => [g.id, g.name]));

export default function KelolaNovelPage() {
  const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const formatViews = (views: number) => {
    return new Intl.NumberFormat('id-ID').format(views);
  }

  const handleEditClick = (novel: Novel) => {
    setSelectedNovel(novel);
    setIsSheetOpen(true);
  };

  return (
    <>
      <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
              <Button variant="ghost" className="mb-4">
                  <Link href="/" className="flex items-center gap-2 text-muted-foreground">
                      <ArrowLeft />
                      Kembali
                  </Link>
              </Button>
            <h1 className="text-3xl md:text-4xl font-bold">Kelola Novel</h1>
            <p className="text-muted-foreground mt-1">
              Tambah dan edit novel Anda
            </p>
          </div>
          <Button size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Tambah Novel
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%] pl-6">Novel</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Chapter</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-center pr-6">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {novels.map((novel) => (
                  <TableRow key={novel.id}>
                    <TableCell className="pl-6 font-medium">
                      <div className="flex items-center gap-4">
                        <Image
                          src={novel.coverImage.imageUrl}
                          alt={`Cover of ${novel.title}`}
                          width={48}
                          height={72}
                          className="rounded-sm object-cover"
                          data-ai-hint={novel.coverImage.imageHint}
                        />
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold">{novel.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {novel.author}
                          </span>
                          {novel.isR18 && (
                            <Badge variant="destructive" className="w-fit mt-1 bg-red-800/80 text-white border-none">
                              <ShieldAlert className="w-3 h-3 mr-1"/>
                              R18
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {novel.genreIds.map((genreId) => (
                          <Badge key={genreId} variant="outline" className="font-normal">
                            {genreMap.get(genreId) || genreId}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={novel.status === 'ongoing' ? 'secondary' : 'default'} className={novel.status === 'ongoing' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}>
                        {novel.status === "ongoing" ? "Berlanjut" : "Tamat"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {novel.chapters.length}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatViews(novel.stats.views)}
                    </TableCell>
                    <TableCell className="text-center pr-6">
                      <div className="flex items-center justify-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <Link href={`/admin/novels/${novel.slug}`}>
                              <BookUp className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditClick(novel)}>
                              <FilePenLine className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                          </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {selectedNovel && (
        <EditNovelSheet
          open={isSheetOpen}
          onOpenChange={setIsSheetOpen}
          novel={selectedNovel}
        />
      )}
    </>
  );
}
