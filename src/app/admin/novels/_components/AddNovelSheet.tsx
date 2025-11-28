
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { genres } from "@/lib/data";
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
import { X, ShieldAlert } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

const formSchema = z.object({
  title: z.string().min(1, "Judul novel harus diisi."),
  author: z.string().min(1, "Nama penulis harus diisi."),
  description: z.string().min(1, "Sinopsis harus diisi."),
  coverUrl: z.string().url("URL gambar tidak valid.").or(z.literal("")),
  genreIds: z.array(z.string()).min(1, "Pilih minimal satu genre."),
  tags: z.array(z.string()),
  status: z.enum(["ongoing", "completed"]),
  freeChapters: z.coerce.number().min(0, "Jumlah chapter gratis tidak boleh negatif."),
  coinCost: z.coerce.number().min(0, "Harga koin tidak boleh negatif."),
  isFree: z.boolean(),
  isR18: z.boolean(),
  isFeatured: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddNovelSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddNovelSheet({ open, onOpenChange }: AddNovelSheetProps) {
  const [coverPreview, setCoverPreview] = useState<string | null>('https://placehold.co/400x600/0f172a/94a3b8?text=Cover');
  const [tagInput, setTagInput] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      coverUrl: "",
      genreIds: [],
      tags: [],
      status: "ongoing",
      freeChapters: 10,
      coinCost: 5,
      isFree: false,
      isR18: false,
      isFeatured: false,
    },
  });
  
  const coverUrl = form.watch("coverUrl");
  const tags = form.watch("tags");
  const isFree = form.watch("isFree");

  useEffect(() => {
    if (isFree) {
      form.setValue("freeChapters", 0);
      form.setValue("coinCost", 0);
    } else {
        form.setValue("freeChapters", 10);
        form.setValue("coinCost", 5);
    }
  }, [isFree, form]);


  const onSubmit = (data: FormValues) => {
    console.log(data);
    onOpenChange(false);
    form.reset();
  };

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      form.setValue("tags", [...tags, newTag]);
    }
    setTagInput("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-[600px] sm:max-w-[600px] p-0 flex flex-col">
        <SheetHeader className="p-6">
          <SheetTitle>Tambah Novel Baru</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-6 pb-6">
            <div className="space-y-4">
              <Label>Gambar Sampul</Label>
              <div className="flex gap-4 items-start">
                <Image
                  src={coverUrl || coverPreview || 'https://placehold.co/400x600/0f172a/94a3b8?text=Cover'}
                  alt="Cover"
                  width={100}
                  height={150}
                  className="rounded-md object-cover"
                  onError={() => setCoverPreview('https://placehold.co/400x600/0f172a/94a3b8?text=Error')}
                />
                <div className="w-full space-y-2">
                  <Input type="file" />
                  <FormField
                    control={form.control}
                    name="coverUrl"
                    render={({ field }) => (
                      <FormItem>
                         <FormLabel className="text-xs text-muted-foreground">Atau masukkan URL:</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
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
                      <Input placeholder="Masukkan judul novel" {...field} />
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
                      <Input placeholder="Nama pena Anda" {...field} />
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
                    <Textarea placeholder="Tulis sinopsis novel Anda..." {...field} rows={5} />
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
                                className={`rounded-full ${genre.id === 'r18' && 'flex items-center gap-1.5'}`}
                                >
                                {genre.id === 'r18' && <ShieldAlert className="w-3.5 h-3.5" />}
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
                <Label htmlFor="tag-input">Tag</Label>
                <div className="flex gap-2">
                    <Input id="tag-input" placeholder="Tambah tag..." value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                        }
                    }} />
                    <Button type="button" onClick={handleAddTag}>Tambah</Button>
                </div>
                <FormDescription>
                    Tekan enter atau klik tambah untuk menambahkan tag.
                </FormDescription>
                <div className="flex flex-wrap gap-2 min-h-[24px]">
                    {tags.map(tag => (
                         <Badge key={tag} variant="secondary" className="font-normal">
                           {tag}
                           <button type="button" className="ml-1 rounded-full hover:bg-muted-foreground/20" onClick={() => form.setValue("tags", tags.filter(t => t !== tag))}>
                            <X className="h-3 w-3"/>
                           </button>
                         </Badge>
                    ))}
                </div>
            </div>

             <FormField
                control={form.control}
                name="isFree"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-secondary/50">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base">Novel Gratis</FormLabel>
                        <FormDescription>
                        Semua chapter novel ini gratis (tidak perlu koin).
                        </FormDescription>
                    </div>
                    <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    </FormItem>
                )}
            />

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
                        <Input type="number" {...field} disabled={isFree} />
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
                    <Input type="number" {...field} disabled={isFree} />
                    </FormControl>
                     <FormDescription>
                        Harga untuk chapter setelah chapter gratis habis.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />

            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="isR18"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">Konten Dewasa (R18)</FormLabel>
                            <FormDescription>
                            Novel mengandung konten 18+.
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
                            Novel akan muncul di bagian unggulan.
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
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Simpan</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
