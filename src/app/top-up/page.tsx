
"use client";

import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Coins, Crown, Gift, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const coinPackages = [
  {
    coins: 100,
    price: 15000,
    bonus: 0,
    icon: <Coins className="w-8 h-8" />,
  },
  {
    coins: 500,
    price: 70000,
    bonus: 50,
    icon: <Sparkles className="w-8 h-8" />,
  },
  {
    coins: 1000,
    price: 130000,
    bonus: 150,
    icon: <Star className="w-8 h-8" />,
    popular: true,
  },
  {
    coins: 2500,
    price: 300000,
    bonus: 500,
    icon: <Crown className="w-8 h-8" />,
  },
  {
    coins: 5000,
    price: 550000,
    bonus: 1500,
    icon: <Gift className="w-8 h-8" />,
  },
];

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function TopUpPage() {
  const { coins } = useUser();

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <p className="text-muted-foreground">Saldo Anda</p>
              <div className="flex items-center gap-2 mt-1">
                <Coins className="w-7 h-7 text-primary" />
                <span className="text-3xl font-bold">{coins}</span>
              </div>
            </div>
            <Button>
              <Coins className="mr-2 h-4 w-4" />
              Beli Koin
            </Button>
          </CardHeader>
        </Card>

        <h2 className="text-3xl font-bold mb-6 text-center">Pilih Paket</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coinPackages.map((pkg, index) => (
            <Card
              key={index}
              className={cn(
                "flex flex-col text-center p-6 rounded-2xl transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/50",
                pkg.popular
                  ? "border-primary border-2 shadow-lg shadow-primary/10"
                  : "border-border"
              )}
            >
              {pkg.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                        Paling Populer
                    </div>
                </div>
              )}
              <CardContent className="flex flex-col items-center flex-1 p-0">
                <div className="p-4 bg-secondary/50 rounded-full mb-4 text-primary">
                  {pkg.icon}
                </div>
                <p className="text-4xl font-bold">
                  {pkg.coins.toLocaleString("id-ID")}
                </p>
                <p className="text-muted-foreground">koin</p>
                {pkg.bonus > 0 && (
                  <p className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded-md text-sm font-medium mt-2">
                    + {pkg.bonus.toLocaleString("id-ID")} bonus
                  </p>
                )}
                <div className="my-6 text-4xl font-extrabold text-primary">
                  {formatRupiah(pkg.price)}
                </div>
                <Button className="w-full mt-auto">Pilih Paket</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-secondary/30 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-center mb-6">Bagaimana Cara Kerjanya?</h3>
          <ol className="space-y-4 max-w-lg mx-auto">
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div className="pt-1">
                <h4 className="font-semibold">Beli Koin</h4>
                <p className="text-muted-foreground">Beli koin menggunakan metode pembayaran pilihan Anda.</p>
              </div>
            </li>
             <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div className="pt-1">
                <h4 className="font-semibold">Buka Bab Premium</h4>
                <p className="text-muted-foreground">Gunakan koin untuk membuka bab premium di novel favorit Anda.</p>
              </div>
            </li>
             <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div className="pt-1">
                <h4 className="font-semibold">Baca Kapan Saja</h4>
                <p className="text-muted-foreground">Bab yang sudah dibuka akan tersedia selamanya untuk Anda baca.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
