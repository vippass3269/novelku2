
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
import { ArrowLeft, Plus, BookUp, FilePenLine, Trash2, ShieldAlert, Coins, CheckCircle, Hourglass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
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

  const updateNovelsInStorage = (updatedNovels: Novel[]) => {
    setNovels(updatedNovels);
    localStorage.setItem('novels_data', JSON.stringify(updatedNovels));
    window.dispatchEvent(new Event('storage'));
  }

  const isAdmin = user?.role === 'admin';
  const isWriter = user?.role === 'writer';
  const canManage = isAdmin || isWriter;

  const userNovels = novels.filter(novel => isAdmin || novel.authorId === user?.id);

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
    if (!isAdmin && novel.authorId !== user?.id) {
      toast({
        variant: "destructive",
        title: "Akses Ditolak",
        description: "Anda tidak memiliki izin untuk menghapus novel ini.",
      });
      return;
    }
    setNovelToDelete(novel);
setIsDeleteAlertOpen(true);
  };
  
  const confirmDelete = () => {
    if (novelToDelete) {
      const updatedNovels = novels.filter(n => n.id !== novelToDelete.id);
      updateNovelsInStorage(updatedNovels);
      toast({
        title: "Berhasil",
        description: `Novel "${novelToDelete.title}" telah dihapus.`,
      });
    }
    setNovelToDelete(null);
    setIsDeleteAlertOpen(false);
  };

  const handleAddNovel = (data: any) => {
    if (!user) return;
    const newNovel: Novel = {
      id: `novel-${Date.now()}`,
      slug: data.title.toLowerCase().replace(/\s+/g, '-'),
      title: data.title,
      author: data.author,
      authorId: user.id,
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
      isFeatured: false, // Only admin can feature
      status: isAdmin ? 'ongoing' : 'pending',
    };
    updateNovelsInStorage([newNovel, ...novels]);
    toast({
        title: "Novel Ditambahkan",
        description: `Novel "${data.title}" berhasil dibuat dan menunggu persetujuan admin.`,
    });
  }

  const handleUpdateNovel = (data: any) => {
    if(!selectedNovel) return;
    
    const updatedNovels = novels.map(novel => {
        if(novel.id === selectedNovel.id) {
            return {
                ...novel,
                title: data.title,
                author: data.author,
                description: data.description,
                coverImage: { ...novel.coverImage, imageUrl: data.coverUrl || novel.coverImage.imageUrl },
                genreIds: data.genreIds,
                status: data.status,
                isFree: data.isFree,
                isR18: data.isR18,
                isFeatured: isAdmin ? data.isFeatured : novel.isFeatured,
            }
        }
        return novel;
    });

    updateNovelsInStorage(updatedNovels);

     toast({
        title: "Novel Diperbarui",
        description: `Novel "${data.title}" berhasil diperbarui.`,
    });
  }
  
  const handleApproveNovel = (novelId: string) => {
    const updatedNovels = novels.map(novel => {
        if(novel.id === novelId) {
            return { ...novel, status: 'ongoing' };
        }
        return novel;
    });
    updateNovelsInStorage(updatedNovels);
    toast({ title: "Novel Disetujui", description: "Novel sekarang sudah tayang." });
  }

  if (!canManage) {
    return (
        <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold">Akses Ditolak</h1>
            <p className="text-muted-foreground mt-2">Anda harus menjadi Admin atau Penulis untuk mengakses halaman ini.</p>
             <Button asChild className="mt-6">
                <Link href="/register/writer">Daftar jadi Penulis</Link>
            </Button>
        </div>
    )
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
              {isAdmin ? "Kelola semua novel di platform." : "Kelola novel yang Anda tulis."}
            </p>
          </div>
          <Button size="lg" onClick={handleAddClick}>
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
                {userNovels.map((novel) => (
                  <TableRow key={novel.id} className={novel.status === 'pending' ? 'bg-yellow-950/50' : ''}>
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
                      {novel.status === 'ongoing' && <Badge variant="secondary" className={'bg-green-500/10 text-green-400 border-green-500/20'}>Berlanjut</Badge>}
                      {novel.status === 'completed' && <Badge variant="default" className={'bg-blue-500/10 text-blue-400 border-blue-500/20'}>Tamat</Badge>}
                      {novel.status === 'pending' && <Badge variant="outline" className="text-yellow-400 border-yellow-400/50"><Hourglass className="h-3 w-3 mr-1.5" />Menunggu</Badge>}
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
                      <div className="flex items-center justify-center gap-1">
                          {isAdmin && novel.status === 'pending' && (
                            <Button variant="ghost" size="sm" className="h-8 text-green-400 hover:text-green-400 hover:bg-green-950/50" onClick={() => handleApproveNovel(novel.id)}>
                                <CheckCircle className="h-4 w-4 mr-2" /> Setujui
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <Link href={`/admin/novels/${novel.slug}`}>
                              <BookUp className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditClick(novel)} disabled={!isAdmin && novel.authorId !== user?.id}>
                              <FilePenLine className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDeleteClick(novel)} disabled={!isAdmin && novel.authorId !== user?.id}>
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
