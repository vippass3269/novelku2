
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Coins, Crown, Gift, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/UserContext";

const coinPackages = [
  {
    coins: 100,
    price: 15000,
    bonus: 0,
    icon: <Coins className="w-6 h-6" />,
  },
  {
    coins: 500,
    price: 70000,
    bonus: 50,
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    coins: 1000,
    price: 130000,
    bonus: 150,
    icon: <Star className="w-6 h-6" />,
    popular: true,
  },
  {
    coins: 2500,
    price: 300000,
    bonus: 500,
    icon: <Crown className="w-6 h-6" />,
  },
];

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};


interface TopUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TopUpDialog({ open, onOpenChange }: TopUpDialogProps) {
    const { coins } = useUser();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl">Beli Koin</DialogTitle>
          <DialogDescription>
            Pilih paket koin untuk melanjutkan petualangan membacamu.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
            <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Saldo Anda Saat Ini</p>
                        <div className="flex items-center gap-2 mt-1">
                            <Coins className="w-6 h-6 text-primary" />
                            <span className="text-2xl font-bold">{coins}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {coinPackages.map((pkg, index) => (
                <Card
                key={index}
                className={cn(
                    "flex flex-col text-center p-4 rounded-xl transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/50 cursor-pointer",
                    pkg.popular
                    ? "border-primary border-2 shadow-md shadow-primary/10"
                    : "border-border"
                )}
                >
                 {pkg.popular && (
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                            Populer
                        </div>
                    </div>
                 )}
                <CardContent className="flex flex-col items-center flex-1 p-0">
                    <div className="p-3 bg-secondary/50 rounded-full mb-3 text-primary">
                    {pkg.icon}
                    </div>
                    <p className="text-2xl font-bold">
                    {pkg.coins.toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-muted-foreground">koin</p>
                    {pkg.bonus > 0 && (
                    <p className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded-md text-xs font-medium mt-2">
                        + {pkg.bonus.toLocaleString("id-ID")}
                    </p>
                    )}
                    <Button className="w-full mt-4" size="sm">{formatRupiah(pkg.price)}</Button>
                </CardContent>
                </Card>
            ))}
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
