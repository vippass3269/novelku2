
"use client";

import { useState } from 'react';
import { users as initialUsers, User } from '@/lib/users';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, ArrowLeft, Shield, User as UserIcon, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);

  // In a real app, you would define what "premium" means. 
  // For now, we'll just add a placeholder property to the user object.
  const [premiumUsers, setPremiumUsers] = useState<string[]>(['user-reader-005']);

  const togglePremium = (userId: string) => {
    setPremiumUsers(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

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
            <h1 className="text-3xl md:text-4xl font-bold">Manajemen Pengguna</h1>
            <p className="text-muted-foreground mt-1">
              Lihat dan kelola semua pengguna terdaftar di platform.
            </p>
          </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Daftar Pengguna</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[35%] pl-6">Pengguna</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Status Keanggotaan</TableHead>
                <TableHead>Tanggal Bergabung</TableHead>
                <TableHead className="text-right pr-6">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const isPremium = premiumUsers.includes(user.id);
                return (
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
                        <Badge 
                            variant={user.role === 'admin' ? 'default' : user.role === 'writer' ? 'secondary' : 'outline'}
                            className={user.role === 'admin' ? 'bg-primary/10 text-primary border-primary/20' : ''}
                        >
                            {user.role === 'admin' && <Shield className="h-3 w-3 mr-1.5" />}
                            {user.role === 'writer' && <UserIcon className="h-3 w-3 mr-1.5" />}
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        {isPremium ? (
                            <Badge variant="secondary" className={'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}>
                                <Star className="h-3 w-3 mr-1.5" />Premium
                            </Badge>
                        ) : (
                            <Badge variant="outline">
                                Biasa
                            </Badge>
                        )}
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
                            <DropdownMenuItem onClick={() => togglePremium(user.id)}>
                                {isPremium ? (
                                    <UserIcon className="mr-2 h-4 w-4" />
                                ) : (
                                    <Star className="mr-2 h-4 w-4" />
                                )}
                                <span>{isPremium ? 'Jadikan Member Biasa' : 'Jadikan Member Premium'}</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                )
            })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
