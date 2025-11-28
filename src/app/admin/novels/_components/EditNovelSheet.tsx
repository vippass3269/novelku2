
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { genres, type Novel } from "@/lib/data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  title: z.string().min(1, "Judul novel harus diisi."),
  author: z.string().min(1, "Nama penulis harus diisi."),
  description: z.string().min(1, "Sinopsis harus diisi."),
  coverUrl: z.string().url("URL gambar tidak valid."),
  genreIds: z.array(z.string()).min(1, "Pilih minimal satu genre."),
  tags: z.array(z.string()),
  status: z.enum(["ongoing", "completed"]),
  freeChapters: z.coerce.number().min(0),
  coinCost: z.coerce.number().min(0),
  isFree: z.boolean(),
  isR18: z.boolean(),
  isFeatured: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditNovelSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  novel: Novel;
}

export function EditNovelSheet({ open, onOpenChange, novel }: EditNovelSheetProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: novel.title,
      author: novel.author,
      description: novel.description,
      coverUrl: novel.coverImage.imageUrl,
      genreIds: novel.genreIds,
      tags: [], // Placeholder for tags
      status: novel.status,
      freeChapters: 10, // Placeholder
      coinCost: novel.chapters.find(c => c.cost > 0)?.cost || 0,
      isFree: novel.isFree,
      isR18: novel.isR18,
      isFeatured: false, // Placeholder
    },
  });

  useEffect(() => {
    form.reset({
      title: novel.title,
      author: novel.author,
      description: novel.description,
      coverUrl: novel.coverImage.imageUrl,
      genreIds: novel.genreIds,
      tags: [],
      status: novel.status,
      freeChapters: 10,
      coinCost: novel.chapters.find(c => c.cost > 0)?.cost || 0,
      isFree: novel.isFree,
      isR18: novel.isR18,
      isFeatured: false,
    });
  }, [novel, form]);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    onOpenChange(false);
  };
  
  const tags = form.watch("tags");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-[600px] sm:max-w-[600px] p-0 flex flex-col">
        <SheetHeader className="p-6">
          <SheetTitle>Edit Novel</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-6 pb-6">
            <div className="space-y-4">
              <Label>Gambar Sampul</Label>
              <div className="flex gap-4 items-start">
                <Image
                  src={form.watch('coverUrl')}
                  alt="Cover"
                  width={100}
                  height={150}
                  className="rounded-md object-cover"
                />
                <div className="w-full space-y-2">
                  <Input type="file" disabled />
                  <FormField
                    control={form.control}
                    name="coverUrl"
                    render={({ field }) => (
                      <FormItem>
                         <FormLabel className="text-xs text-muted-foreground">Atau masukkan URL:</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Novel *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Penulis *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sinopsis *</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
                control={form.control}
                name="genreIds"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                        <div className="flex flex-wrap gap-2">
                        {genres.map((genre) => (
                            <Button
                                key={genre.id}
                                type="button"
                                variant={field.value.includes(genre.id) ? "default" : "outline"}
                                onClick={() => {
                                    const newValue = field.value.includes(genre.id)
                                    ? field.value.filter((id) => id !== genre.id)
                                    : [...field.value, genre.id];
                                    field.onChange(newValue);
                                }}
                                className="rounded-full"
                                >
                                {genre.name}
                            </Button>
                        ))}
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <div className="space-y-2">
                <Label>Tag</Label>
                <div className="flex gap-2">
                    <Input placeholder="Tambah tag..." onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            const tag = e.currentTarget.value.trim();
                            if(tag && !tags.includes(tag)){
                                form.setValue("tags", [...tags, tag]);
                            }
                            e.currentTarget.value = "";
                        }
                    }} />
                    <Button type="button">Tambah</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                         <Badge key={tag} variant="secondary" className="font-normal">
                           {tag}
                           <button type="button" className="ml-1" onClick={() => form.setValue("tags", tags.filter(t => t !== tag))}>
                            <X className="h-3 w-3"/>
                           </button>
                         </Badge>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih status" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="ongoing">Berlanjut</SelectItem>
                                <SelectItem value="completed">Tamat</SelectItem>
                            </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="freeChapters"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah Chapter Gratis</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>

             <FormField
                control={form.control}
                name="coinCost"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Harga Koin per Chapter</FormLabel>
                    <FormControl>
                    <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="isFree"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-green-950/50 border-green-500/20">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base text-white">Novel Gratis</FormLabel>
                            <FormDescription className="text-green-200/80">
                            Semua chapter novel ini gratis (tidak perlu koin)
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isR18"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">Konten Dewasa (R18)</FormLabel>
                            <FormDescription>
                            Novel mengandung konten 18+
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">Tampilkan di Beranda</FormLabel>
                            <FormDescription>
                            Novel akan muncul di bagian unggulan
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            
          </form>
        </Form>
        </ScrollArea>
        </div>
        <SheetFooter className="p-6 bg-secondary/30 border-t">
          <SheetClose asChild>
            <Button variant="ghost">Batal</Button>
          </SheetClose>
          <Button onClick={form.handleSubmit(onSubmit)}>Simpan</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

