
"use client";

import { useState } from 'react';
import { users as initialUsers, User } from '@/lib/users';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, ArrowLeft, CheckCircle, XCircle, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function ManageAuthorsPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const { toast } = useToast();

  const handleStatusChange = (userId: string, newStatus: 'approved' | 'rejected' | 'pending') => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, verificationStatus: newStatus } : user
    ));
    toast({
      title: 'Status Penulis Diperbarui',
      description: `Status untuk pengguna telah diubah menjadi ${newStatus}.`,
    });
  };
  
  const handleRoleChange = (userId: string, newRole: 'admin' | 'writer') => {
    setUsers(users.map(user => {
        if (user.id === userId) {
            return { ...user, role: newRole, verificationStatus: 'approved' };
        }
        return user;
    }));
    toast({
      title: 'Peran Pengguna Diperbarui',
      description: `Pengguna sekarang memiliki peran ${newRole}.`,
    });
  };

  const writers = users.filter(user => user.role === 'writer' || user.role === 'admin');

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
         <div>
              <Button variant="ghost" className="mb-4" asChild>
                  <Link href="/admin/dashboard" className="flex items-center gap-2 text-muted-foreground">
                      <ArrowLeft />
                      Kembali ke Dashboard
                  </Link>
              </Button>
            <h1 className="text-3xl md:text-4xl font-bold">Manajemen Penulis</h1>
            <p className="text-muted-foreground mt-1">
              Verifikasi, kelola, dan lihat semua penulis di platform.
            </p>
          </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Daftar Penulis</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%] pl-6">Penulis</TableHead>
                <TableHead>Status Verifikasi</TableHead>
                <TableHead>Novel Ditulis</TableHead>
                <TableHead>Tanggal Bergabung</TableHead>
                <TableHead className="text-right pr-6">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {writers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="pl-6 font-medium">
                    <div className="flex items-center gap-4">
                        <Image
                            src={user.avatar}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                        />
                        <div>
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.verificationStatus === 'approved' && user.role === 'writer' && <Badge variant="secondary" className={'bg-green-500/10 text-green-400 border-green-500/20'}><CheckCircle className="h-3 w-3 mr-1.5" />Disetujui</Badge>}
                    {user.verificationStatus === 'approved' && user.role === 'admin' && <Badge variant="default" className={'bg-primary/10 text-primary border-primary/20'}><Shield className="h-3 w-3 mr-1.5" />Admin</Badge>}
                    {user.verificationStatus === 'pending' && <Badge variant="outline" className="text-yellow-400 border-yellow-400/50">Menunggu</Badge>}
                    {user.verificationStatus === 'rejected' && <Badge variant="destructive" className={'bg-red-900/50 text-red-400 border-red-500/20'}><XCircle className="h-3 w-3 mr-1.5" />Ditolak</Badge>}
                  </TableCell>
                   <TableCell className="text-center">
                    {user.novelsWritten}
                  </TableCell>
                  <TableCell>
                     {format(new Date(user.joinedDate), 'dd MMM yyyy', { locale: id })}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Buka menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                          {user.verificationStatus === 'pending' && (
                              <>
                                <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'approved')}>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Setujui
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => handleStatusChange(user.id, 'rejected')}>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Tolak
                                </DropdownMenuItem>
                              </>
                          )}
                          {user.role !== 'admin' && user.verificationStatus === 'approved' && (
                             <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'admin')}>
                                <Shield className="mr-2 h-4 w-4" />
                                Jadikan Admin
                            </DropdownMenuItem>
                          )}
                           {user.role === 'admin' && (
                             <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'writer')}>
                                <Shield className="mr-2 h-4 w-4" />
                                Jadikan Penulis
                            </DropdownMenuItem>
                          )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
