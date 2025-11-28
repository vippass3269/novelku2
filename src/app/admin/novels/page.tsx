
"use client";

import { novels as initialNovels, genres, type Chapter } from "@/lib/data";
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
import { ArrowLeft, Plus, BookUp, FilePenLine, Trash2, ShieldAlert, Coins } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EditNovelSheet } from "./_components/EditNovelSheet";
import { AddNovelSheet } from "./_components/AddNovelSheet";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { DeleteNovelDialog } from "./_components/DeleteNovelDialog";

const genreMap = new Map(genres.map(g => [g.id, g.name]));

export default function KelolaNovelPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [novels, setNovels] = useState<Novel[]>(initialNovels);
  const [selectedNovel, setSelectedNovel] = useState<Novel | null>(null);
  const [novelToDelete, setNovelToDelete] = useState<Novel | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const isAdmin = user?.role === 'admin';

  const formatViews = (views: number) => {
    return new Intl.NumberFormat('id-ID').format(views);
  }

  const handleEditClick = (novel: Novel) => {
    setSelectedNovel(novel);
    setIsEditSheetOpen(true);
  };
  
  const handleAddClick = () => {
    setIsAddSheetOpen(true);
  };

  const handleDeleteClick = (novel: Novel) => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Akses Ditolak",
        description: "Anda tidak memiliki izin untuk menghapus novel.",
      });
      return;
    }
    setNovelToDelete(novel);
    setIsDeleteAlertOpen(true);
  };
  
  const confirmDelete = () => {
    if (novelToDelete) {
      setNovels(currentNovels => currentNovels.filter(n => n.id !== novelToDelete.id));
      toast({
        title: "Berhasil",
        description: `Novel "${novelToDelete.title}" telah dihapus.`,
      });
    }
    setNovelToDelete(null);
    setIsDeleteAlertOpen(false);
  };

  const handleAddNovel = (data: any) => {
    const newNovel: Novel = {
      id: `novel-${Date.now()}`,
      slug: data.title.toLowerCase().replace(/\s+/g, '-'),
      title: data.title,
      author: data.author,
      description: data.description,
      coverImage: {
          id: 'new-cover',
          imageUrl: data.coverUrl || 'https://placehold.co/400x600/0f172a/94a3b8?text=Cover',
          imageHint: 'novel cover',
          description: `Cover for ${data.title}`
      },
      genreIds: data.genreIds,
      chapters: [] as Chapter[],
      stats: {
          rating: 0,
          views: 0
      },
      isFree: data.isFree,
      isR18: data.isR18,
      isFeatured: data.isFeatured,
      status: data.status,
    };
    setNovels(prev => [newNovel, ...prev]);
    toast({
        title: "Novel Ditambahkan",
        description: `Novel "${data.title}" berhasil dibuat.`,
    });
  }

  const handleUpdateNovel = (data: any) => {
    if(!selectedNovel) return;
    
    setNovels(prev => prev.map(novel => {
        if(novel.id === selectedNovel.id) {
            return {
                ...novel,
                title: data.title,
                author: data.author,
                description: data.description,
                coverImage: data.coverUrl ? { ...novel.coverImage, imageUrl: data.coverUrl } : novel.coverImage,
                genreIds: data.genreIds,
                status: data.status,
                isFree: data.isFree,
                isR18: data.isR18,
                isFeatured: data.isFeatured,
            }
        }
        return novel;
    }));

     toast({
        title: "Novel Diperbarui",
        description: `Novel "${data.title}" berhasil diperbarui.`,
    });
  }


  return (
    <>
      <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
              <Button variant="ghost" className="mb-4" asChild>
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
          <Button size="lg" onClick={handleAddClick} disabled={!isAdmin}>
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
                  <TableHead>Tipe</TableHead>
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
                    <TableCell>
                       <Badge
                        variant="outline"
                        className={
                          novel.isFree
                            ? "border-green-500/50 text-green-400"
                            : "border-primary/50 text-primary"
                        }
                      >
                         <div className="flex items-center gap-1">
                            {novel.isFree ? (
                                <>Gratis</>
                            ) : (
                                <><Coins className="h-3 w-3" /> Berbayar</>
                            )}
                         </div>
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
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditClick(novel)} disabled={!isAdmin}>
                              <FilePenLine className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDeleteClick(novel)} disabled={!isAdmin}>
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
      
      <AddNovelSheet
        open={isAddSheetOpen}
        onOpenChange={setIsAddSheetOpen}
        onSave={handleAddNovel}
      />
      
      {selectedNovel && (
        <EditNovelSheet
          open={isEditSheetOpen}
          onOpenChange={setIsEditSheetOpen}
          novel={selectedNovel}
          onSave={handleUpdateNovel}
        />
      )}

      {novelToDelete && (
        <DeleteNovelDialog
          open={isDeleteAlertOpen}
          onOpenChange={setIsDeleteAlertOpen}
          onConfirm={confirmDelete}
          novelTitle={novelToDelete.title}
        />
      )}
    </>
  );
}

    