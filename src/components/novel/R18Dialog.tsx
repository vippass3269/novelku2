
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
import { ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

interface R18DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function R18Dialog({ open, onOpenChange, onConfirm }: R18DialogProps) {
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <ShieldAlert className="w-16 h-16 text-destructive" />
          </div>
          <AlertDialogTitle className="text-center">Peringatan Konten Dewasa (18+)</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Novel ini mengandung konten yang ditujukan untuk pembaca dewasa. Dengan melanjutkan, Anda mengonfirmasi bahwa Anda berusia 18 tahun atau lebih dan menyetujui untuk melihat konten tersebut.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogCancel onClick={() => router.back()}>Kembali</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} asChild>
            <Button>Ya, Saya Berusia 18+</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
