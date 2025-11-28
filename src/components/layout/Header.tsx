"use client";

import Link from "next/link";
import { BookMarked, Compass, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-6 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookMarked className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">Novelku</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
           <nav className="hidden md:flex items-center">
             <Link href="/" passHref>
              <Button variant="ghost" className="flex items-center gap-2">
                <Compass className="h-5 w-5" />
                Jelajahi
              </Button>
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center justify-end">
          <Button>
            <LogIn className="mr-2 h-4 w-4" />
            Masuk
          </Button>
        </div>
      </div>
    </header>
  );
}
