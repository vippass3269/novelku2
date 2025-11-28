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
import { Coins } from "lucide-react";

interface UnlockChapterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  chapterTitle: string;
  cost: number;
}

export function UnlockChapterDialog({ open, onOpenChange, onConfirm, chapterTitle, cost }: UnlockChapterDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Buka Bab Baru?</AlertDialogTitle>
          <AlertDialogDescription>
            Anda akan membuka "{chapterTitle}". Tindakan ini akan mengurangi koin Anda.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center justify-center py-4">
            <div className="flex items-center space-x-2 text-lg font-bold text-accent">
                <Coins className="h-6 w-6" />
                <span>{cost} Koin</span>
            </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Buka Bab</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
