
"use client";

import Link from "next/link";
import { BookMarked, Compass, Library, BookUp, LogOut, User, Coins, Store, Shield, Users, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { TopUpDialog } from "../top-up/TopUpDialog";

export default function Header() {
  const { user, coins } = useUser();
  const isLoggedIn = !!user;
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const isAdmin = user?.role === 'admin';
  const isWriter = user?.role === 'writer';

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="mr-6 flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <BookMarked className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold">Novelku</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" passHref>
              <Button variant="ghost" className="flex items-center gap-2">
                <Compass className="h-5 w-5" />
                Jelajahi
              </Button>
            </Link>
            <Link href="/library" passHref>
              <Button variant="ghost" className="flex items-center gap-2">
                <Library className="h-5 w-5" />
                Pustaka
              </Button>
            </Link>
            {(isAdmin || isWriter) && (
              <Link href="/admin/novels" passHref>
                <Button variant="ghost" className="flex items-center gap-2">
                  <BookUp className="h-5 w-5" />
                  Kelola Novel
                </Button>
              </Link>
            )}
            {isAdmin && (
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Admin Panel
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                           <Link href="/admin/dashboard">
                              <Shield className="mr-2 h-4 w-4" />
                              <span>Dashboard</span>
                          </Link>
                      </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                           <Link href="/admin/authors">
                              <Users className="mr-2 h-4 w-4" />
                              <span>Manajemen Penulis</span>
                          </Link>
                      </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                           <Link href="/admin/users">
                              <Users className="mr-2 h-4 w-4" />
                              <span>Manajemen Pengguna</span>
                          </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                     <DropdownMenuGroup>
                        <DropdownMenuLabel>Front-end Control</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                           <Link href="/admin/settings/banners">
                              <ImageIcon className="mr-2 h-4 w-4" />
                              <span>Manajemen Banner</span>
                          </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
            )}
          </nav>
          
          <div className="flex flex-1 items-center justify-end gap-4">
            {isLoggedIn ? (
              <>
                <Button variant="outline" size="sm" className="rounded-full" onClick={() => setIsTopUpOpen(true)}>
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-primary" />
                    <span>{coins}</span>
                  </div>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/library">
                            <Library className="mr-2 h-4 w-4" />
                            <span>Pustaka</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/top-up">
                            <Store className="mr-2 h-4 w-4" />
                            <span>Toko Koin</span>
                        </Link>
                    </DropdownMenuItem>
                    {(isAdmin || isWriter) && (
                      <DropdownMenuItem asChild>
                          <Link href="/admin/novels">
                              <BookUp className="mr-2 h-4 w-4" />
                              <span>Kelola Novel</span>
                          </Link>
                      </DropdownMenuItem>
                    )}
                    {isAdmin && (
                        <DropdownMenuItem asChild>
                            <Link href="/admin/dashboard">
                                <Shield className="mr-2 h-4 w-4" />
                                <span>Admin Panel</span>
                            </Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Keluar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button>
                <LogOut className="mr-2 h-4 w-4" />
                Masuk
              </Button>
            )}
          </div>
        </div>
      </header>
      <TopUpDialog open={isTopUpOpen} onOpenChange={setIsTopUpOpen} />
    </>
  );
}
