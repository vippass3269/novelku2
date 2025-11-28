
"use client";

import Link from "next/link";
import { BookMarked, Compass, Library, BookUp, LogIn, User, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { TopUpDialog } from "../top-up/TopUpDialog";

export default function Header() {
  const { coins } = useUser();
  const isLoggedIn = true; // Placeholder for user auth status
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);

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
                Perpustakaan
              </Button>
            </Link>
            <Link href="/admin/novels" passHref>
              <Button variant="ghost" className="flex items-center gap-2">
                <BookUp className="h-5 w-5" />
                Kelola Novel
              </Button>
            </Link>
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
                        <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Pengguna</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          pengguna@novelku.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Keluar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button>
                <LogIn className="mr-2 h-4 w-4" />
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
