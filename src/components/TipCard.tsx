import { Lock, Check, Clock, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { LoginModal } from "./LoginModal";
import { Profile } from "./Header";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

interface TipCardProps {
  homeTeam: string;
  awayTeam: string;
  league: string;
  prediction: string;
  odds: string;
  confidence: number;
  time: string;
  isVip?: boolean;
  status?: "pending" | "won" | "lost";
}

const TipCard = ({
  homeTeam,
  awayTeam,
  league,
  prediction,
  odds,
  confidence,
  time,
  isVip = false,
  status = "pending",
 
}: TipCardProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "won":
        return <Check className="w-5 h-5 text-success" />;
      case "lost":
        return <span className="text-destructive font-bold">✗</span>;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

   const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user } = useAuth();


  return (
    <div
      className={cn(
        "relative rounded-xl p-5 border transition-all duration-300 hover:scale-[1.02]",
        isVip 
          ? "gradient-card border-primary/30 shadow-gold"
          : "bg-card border-border/50 shadow-card",
        status === "won" && "border-success/50"
      )}
    >
      {isVip && (
        <div className="absolute -top-3 left-4 px-3 py-1 gradient-gold rounded-full text-xs font-bold text-primary-foreground flex items-center gap-1">
          <Trophy className="w-3 h-3" />
          VIP
        </div>
      )}

      <div className={cn("flex items-start justify-between mb-4", !user && "blur-vip select-none")}>
        <div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {league}
          </span>
          <div className="text-xs text-muted-foreground mt-1">{new Date(time).toLocaleString("en-KE", {
  dateStyle: "medium",
  timeStyle: "short",
})}
</div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
        </div>
      </div>

      <div className={cn("relative", !user && "blur-vip select-none")}>
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">{homeTeam}</span>
            <span className="text-muted-foreground">vs</span>
            <span className="font-semibold text-foreground">{awayTeam}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div>
            <span className="text-xs text-muted-foreground">Prediction</span>
            <div className="font-bold text-primary">{prediction}</div>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground">Odds</span>
            <div className="font-bold text-foreground">{odds}</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Confidence</span>
            <span className="text-primary font-semibold">{confidence}%</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full gradient-gold rounded-full transition-all duration-500"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      </div>

      {isVip && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-xl backdrop-blur-sm">
          <div className="text-center">
            <Lock className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-semibold text-foreground">VIP Only</p>
            <a href="#pricing" className="text-xs text-primary hover:underline">
              Unlock Now
            </a>
          </div>
        </div>
      )}

        {!user && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-xl backdrop-blur-sm">
          <div className="text-center">
            <Lock className="w-8 h-8 text-primary mx-auto mb-2" />
            <Button onClick={() => setIsLoginOpen(true)} variant="ghost">
              Login to view tips
            </Button>
            {/* Login modal */}
              <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLogin={(user) => {
                  setIsLoginOpen(false);
                  toast.success(`Welcome back... 🎉`);
                }}
              />
          </div>
        </div>
      )}
    </div>
  );
};

export default TipCard;
