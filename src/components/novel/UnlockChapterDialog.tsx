"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Coins } from "lucide-react";

interface UnlockChapterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  chapterTitle: string;
  cost: number;
  userCoins: number;
}

export function UnlockChapterDialog({ open, onOpenChange, onConfirm, chapterTitle, cost, userCoins }: UnlockChapterDialogProps) {
  const hasEnoughCoins = userCoins >= cost;
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Buka Bab "{chapterTitle}"?</AlertDialogTitle>
          <AlertDialogDescription>
            {hasEnoughCoins 
              ? `Anda akan menggunakan ${cost} koin untuk membuka bab ini. Tindakan ini tidak dapat dibatalkan.`
              : `Koin Anda tidak cukup untuk membuka bab ini. Anda memerlukan ${cost} koin, tetapi hanya memiliki ${userCoins} koin.`
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center justify-center py-4 bg-secondary/30 rounded-md">
            <div className="flex items-center space-x-2 text-lg font-bold text-primary">
                <Coins className="h-6 w-6" />
                <span>Biaya: {cost} Koin</span>
            </div>
        </div>
         <div className="text-center text-sm text-muted-foreground">
            Sisa Koin Anda: {userCoins}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={!hasEnoughCoins} asChild>
            <Button disabled={!hasEnoughCoins}>
              {hasEnoughCoins ? `Buka dengan ${cost} Koin` : 'Koin Tidak Cukup'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
