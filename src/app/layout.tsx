import type { Metadata } from 'next';
import './globals.css';
import { Literata } from 'next/font/google';
import { cn } from '@/lib/utils';
import { UserProvider } from '@/contexts/UserContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";

const literata = Literata({ subsets: ['latin'], variable: '--font-literata' });

export const metadata: Metadata = {
  title: 'Novelku - Baca Novel Favoritmu',
  description: 'Jelajahi dan baca ribuan novel dari berbagai genre di Novelku.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased", literata.variable)}>
        <UserProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
