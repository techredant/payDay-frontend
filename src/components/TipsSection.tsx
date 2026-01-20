"use client";

import { Flame, Crown } from "lucide-react";
import TipCard from "./TipCard";
import { useEffect, useState } from "react";

interface TipCardProps {
  homeTeam: string;
  awayTeam: string;
  league: string;

  prediction: string;   // ✅ optional
  odds: string;         // ✅ optional

  confidence: number;
  time: string;
  isVip?: boolean;
  status?: "pending" | "won" | "lost";
  
}


const TipsSection = () => {
  const [freeTips, setFreeTips] = useState<TipCardProps[]>([]);
  const [vipTips, setVipTips] = useState<TipCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ get user from localStorage
  const currentUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const canViewVip = currentUser?.isVip || currentUser?.isAdmin;

useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("https://pay-day-backend.vercel.app/api/tip", {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  })
    .then((res) => res.json())
    .then((data: TipCardProps[]) => {
      const free = data.sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        ).filter((t) => !t.isVip); 
      const vip =  data.sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        ).filter((t) => t.isVip);

      setFreeTips(free);
      setVipTips(vip);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
}, []);


  if (loading) {
    return (
      <section className="py-24 text-center text-muted-foreground">
        Loading tips...
      </section>
    );
  }

  return (
    <section id="tips" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(142_76%_45%/0.05),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* FREE TIPS */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Flame className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Today&apos;s Free Tips
            </h2>
          </div>

   {freeTips.length === 0 ? (
            <p className="text-muted-foreground">No free tips available.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freeTips.map((tip, index) => (
                <TipCard key={index} {...tip} />
              ))}
            </div>
          )}
         
        </div>

        {/* VIP TIPS */}
        <div id="vip">
          <div className="flex items-center gap-3 mb-8">
            <Crown className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              VIP Exclusive Picks
            </h2>

            {!canViewVip && (
              <span className="px-3 py-1 gradient-gold rounded-full text-xs font-bold">
                LOCKED
              </span>
            )}
          </div>

          {vipTips.length === 0 ? (
            <p className="text-muted-foreground">No VIP tips available.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {vipTips.map((tip, index) => (
                <TipCard
                  key={index}
                  {...tip}
                  isVip
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TipsSection;
