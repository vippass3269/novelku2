
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin' | 'writer';
}

interface UserContextType {
  user: User | null;
  coins: number;
  library: string[];
  unlockedChapters: string[];
  addToLibrary: (novelSlug: string) => void;
  removeFromLibrary: (novelSlug: string) => void;
  isNovelInLibrary: (novelSlug: string) => boolean;
  unlockChapter: (chapterId: string, cost: number) => boolean;
  isChapterUnlocked: (chapterId: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialCoins = 100;

// Mock user data. In a real app, this would come from an auth provider.
const mockUser: User = {
  id: 'user-admin-001',
  name: 'Pengguna Admin',
  email: 'admin@novelku.com',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  role: 'admin',
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(mockUser);
  const [coins, setCoins] = useState<number>(initialCoins);
  const [library, setLibrary] = useState<string[]>([]);
  const [unlockedChapters, setUnlockedChapters] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedCoins = localStorage.getItem('novelku_coins');
      const storedLibrary = localStorage.getItem('novelku_library');
      const storedUnlockedChapters = localStorage.getItem('novelku_unlocked_chapters');

      if (storedCoins) {
        setCoins(JSON.parse(storedCoins));
      } else {
        setCoins(initialCoins);
      }

      if (storedLibrary) {
        setLibrary(JSON.parse(storedLibrary));
      }

      if (storedUnlockedChapters) {
        setUnlockedChapters(JSON.parse(storedUnlockedChapters));
      }
    } catch (error) {
      console.error("Failed to read from localStorage", error);
      setCoins(initialCoins);
      setLibrary([]);
      setUnlockedChapters([]);
    } finally {
        setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
        try {
            localStorage.setItem('novelku_coins', JSON.stringify(coins));
            localStorage.setItem('novelku_library', JSON.stringify(library));
            localStorage.setItem('novelku_unlocked_chapters', JSON.stringify(unlockedChapters));
        } catch (error) {
            console.error("Failed to write to localStorage", error);
        }
    }
  }, [coins, library, unlockedChapters, isInitialized]);
  

  const addToLibrary = (novelSlug: string) => {
    setLibrary((prevLibrary) => {
      if (!prevLibrary.includes(novelSlug)) {
        toast({ title: "Berhasil", description: "Novel ditambahkan ke pustaka." });
        return [...prevLibrary, novelSlug];
      }
      return prevLibrary;
    });
  };

  const removeFromLibrary = (novelSlug: string) => {
    setLibrary((prevLibrary) => {
      if (prevLibrary.includes(novelSlug)) {
        toast({ title: "Berhasil", description: "Novel dihapus dari pustaka." });
        return prevLibrary.filter((slug) => slug !== novelSlug);
      }
      return prevLibrary;
    });
  };

  const isNovelInLibrary = (novelSlug: string) => {
    return library.includes(novelSlug);
  };

  const unlockChapter = (chapterId: string, cost: number) => {
    if (coins >= cost) {
      const newCoinTotal = coins - cost;
      setCoins(newCoinTotal);
      setUnlockedChapters((prev) => [...prev, chapterId]);
      toast({ title: "Berhasil!", description: `Bab berhasil dibuka. Sisa koin Anda: ${newCoinTotal}` });
      return true;
    } else {
      toast({ title: "Gagal", description: "Koin tidak cukup untuk membuka bab ini.", variant: "destructive" });
      return false;
    }
  };
  
  const isChapterUnlocked = (chapterId: string) => {
    return unlockedChapters.includes(chapterId);
  };

  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return (
    <UserContext.Provider value={{ user, coins, library, unlockedChapters, addToLibrary, removeFromLibrary, isNovelInLibrary, unlockChapter, isChapterUnlocked }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
