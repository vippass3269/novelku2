
"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, CheckCircle, DollarSign, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const writerRegisterSchema = z.object({
  name: z.string().min(3, { message: 'Nama harus memiliki minimal 3 karakter.' }),
  email: z.string().email({ message: 'Email tidak valid.' }),
  password: z.string().min(8, { message: 'Password harus memiliki minimal 8 karakter.' }),
  confirmPassword: z.string(),
  agree: z.boolean().refine(val => val === true, {
    message: 'Anda harus menyetujui Syarat & Ketentuan.'
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Konfirmasi password tidak cocok.',
  path: ['confirmPassword'],
});

type WriterRegisterFormValues = z.infer<typeof writerRegisterSchema>;

export default function WriterRegisterPage() {
    const { toast } = useToast();
    const router = useRouter();

  const form = useForm<WriterRegisterFormValues>({
    resolver: zodResolver(writerRegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agree: false,
    },
  });

  const onSubmit = (data: WriterRegisterFormValues) => {
    console.log(data);
    toast({
        title: "Pendaftaran Berhasil!",
        description: "Selamat datang, Penulis! Akun Anda telah dibuat.",
    });
    router.push('/admin/novels');
  };

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center py-12">
       <div className="w-full max-w-4xl">
        <Button variant="ghost" asChild className="mb-4">
            <Link href="/" className='flex items-center gap-2 text-muted-foreground'>
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Beranda
            </Link>
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Jadilah Penulis di Novelku</h1>
                    <p className="text-muted-foreground">Bergabunglah dengan komunitas kami dan mulailah perjalanan menulismu.</p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                            <Edit className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Publikasikan Karyamu</h3>
                            <p className="text-muted-foreground text-sm">Bagikan ceritamu dengan ribuan pembaca setia kami.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                            <DollarSign className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Dapatkan Penghasilan</h3>
                            <p className="text-muted-foreground text-sm">Monetisasi novelmu dengan sistem koin kami dan dapatkan komisi menarik dari setiap chapter yang terjual.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                            <CheckCircle className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Proses Mudah</h3>
                            <p className="text-muted-foreground text-sm">Panel penulis yang intuitif dan proses persetujuan yang cepat oleh tim admin kami.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <Card>
            <CardHeader>
                <CardTitle>Daftar sebagai Penulis</CardTitle>
                <CardDescription>Isi formulir di bawah untuk membuat akun penulis.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nama Pena</FormLabel>
                        <FormControl>
                            <Input placeholder="Nama pena Anda" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="email@anda.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Konfirmasi Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="agree"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-4">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>
                            Saya menyetujui <Link href="/terms" className="text-primary hover:underline">Syarat & Ketentuan</Link> sebagai penulis.
                            </FormLabel>
                             <FormMessage />
                        </div>
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full">Daftar Sekarang</Button>
                </form>
                </Form>
            </CardContent>
            </Card>
        </div>
       </div>
    </div>
  );
}
