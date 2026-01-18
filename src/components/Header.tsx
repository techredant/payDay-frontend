import { Trophy, Crown } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <Trophy className="w-8 h-8 text-primary" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
          </div>
          <span className="text-xl font-heading font-bold text-foreground">
            Payday<span className="text-gradient-gold">Picks</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#tips" className="text-muted-foreground hover:text-foreground transition-colors">
            Free Tips
          </a>
          <a href="#vip" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Crown className="w-4 h-4 text-primary" />
            VIP
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3">
        
          <Link to="/admin">
            <Button variant="ghost" size="sm">
              Admin
            </Button>
          </Link>
          <a href="#pricing">
            <Button variant="vip" size="sm">
              <Crown className="w-4 h-4" />
              Join VIP
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
