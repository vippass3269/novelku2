"use client";

import Link from "next/link";
import { Coins, BookText } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const { coins } = useUser();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/library", label: "Pustaka" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookText className="h-6 w-6 text-primary" />
            <span className="font-bold">Novelku</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <div className="flex items-center space-x-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-accent">
            <Coins className="h-5 w-5" />
            <span>{coins}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
