
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { users as initialUsers } from '@/lib/users';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin' | 'writer';
  verificationStatus?: 'pending' | 'approved' | 'rejected';
}

interface UserContextType {
  user: User | null;
  coins: number;
  library: string[];
  unlockedChapters: string[];
  login: (role: 'admin' | 'writer' | 'user') => void;
  logout: () => void;
  addToLibrary: (novelSlug: string) => void;
  removeFromLibrary: (novelSlug: string) => void;
  isNovelInLibrary: (novelSlug: string) => boolean;
  unlockChapter: (chapterId: string, cost: number) => boolean;
  isChapterUnlocked: (chapterId: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialCoins = 100;

const mockAdmin: User = initialUsers.find(u => u.role === 'admin')!;
const mockWriter: User = initialUsers.find(u => u.role === 'writer' && u.verificationStatus === 'approved')!;
const mockUser: User = initialUsers.find(u => u.role === 'user')!;


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [coins, setCoins] = useState<number>(initialCoins);
  const [library, setLibrary] = useState<string[]>([]);
  const [unlockedChapters, setUnlockedChapters] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedCoins = localStorage.getItem('novelku_coins');
      const storedLibrary = localStorage.getItem('novelku_library');
      const storedUnlockedChapters = localStorage.getItem('novelku_unlocked_chapters');
      const storedUser = localStorage.getItem('novelku_user');

      if (storedCoins) setCoins(JSON.parse(storedCoins));
      else setCoins(initialCoins);

      if (storedLibrary) setLibrary(JSON.parse(storedLibrary));
      if (storedUnlockedChapters) setUnlockedChapters(JSON.parse(storedUnlockedChapters));
      if (storedUser) setUser(JSON.parse(storedUser));

    } catch (error) {
      console.error("Failed to read from localStorage", error);
      setCoins(initialCoins);
      setLibrary([]);
      setUnlockedChapters([]);
      setUser(null);
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
            if (user) {
                localStorage.setItem('novelku_user', JSON.stringify(user));
            } else {
                localStorage.removeItem('novelku_user');
            }
        } catch (error) {
            console.error("Failed to write to localStorage", error);
        }
    }
  }, [coins, library, unlockedChapters, user, isInitialized]);
  
  const login = (role: 'admin' | 'writer' | 'user' = 'admin') => {
      let userToLogin;
      if (role === 'admin') userToLogin = mockAdmin;
      if (role === 'writer') userToLogin = mockWriter;
      if (role === 'user') userToLogin = mockUser;
      setUser(userToLogin || mockAdmin);
      toast({ title: "Login Berhasil", description: `Selamat datang kembali, ${userToLogin?.name}!`})
  }

  const logout = () => {
      setUser(null);
      toast({ title: "Logout Berhasil", description: "Anda telah keluar."})
  }


  const addToLibrary = (novelSlug: string) => {
    if (!user) {
        toast({ title: "Harap Login", description: "Anda harus login untuk menambah ke pustaka.", variant: "destructive"});
        return;
    }
    setLibrary((prevLibrary) => {
      if (!prevLibrary.includes(novelSlug)) {
        toast({ title: "Berhasil", description: "Novel ditambahkan ke pustaka." });
        return [...prevLibrary, novelSlug];
      }
      return prevLibrary;
    });
  };

  const removeFromLibrary = (novelSlug: string) => {
     if (!user) {
        toast({ title: "Harap Login", description: "Anda harus login untuk menghapus dari pustaka.", variant: "destructive"});
        return;
    }
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
     if (!user) {
        toast({ title: "Harap Login", description: "Anda harus login untuk membuka chapter.", variant: "destructive"});
        return false;
    }
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
    <UserContext.Provider value={{ user, coins, library, unlockedChapters, login, logout, addToLibrary, removeFromLibrary, isNovelInLibrary, unlockChapter, isChapterUnlocked }}>
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
