import { useEffect, useState } from "react";
import { Trophy, Crown, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { LoginModal } from "./LoginModal";
import { toast } from "sonner";

export type Profile = {
  _id: string;
  name: string;
  email: string;
};

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);

const [currentUser, setCurrentUser] = useState(null);

useEffect(() => {
  const user = localStorage.getItem("user");
  if (user) setCurrentUser(JSON.parse(user));
}, []);

  // fetch all profiles from backend (optional, only for admin check)
  useEffect(() => {
    fetch("http://localhost:5000/api/profile")
      .then((res) => res.json())
      .then((data) => {
        const list = data.profiles ?? data;
        setProfiles(list);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log("Current User:", currentUser);

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
        
        <div className="flex items-center gap-3">

          {!currentUser ? (
            <>
              {/* Sign In button */}
              <Button onClick={() => setIsLoginOpen(true)} variant="ghost">
                <LogIn className="h-2 w-4" />
                Sign In
              </Button>

              {/* Login modal */}
              <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLogin={(user: Profile) => {
                  setCurrentUser(user);
                  setIsLoginOpen(false);
                  toast.success(`Welcome back, ${user.name}! 🎉`);
                }}
              />
            </>
          ) : (
            <>              
              {/* Logout button */}
              <Button
                variant="ghost"
                onClick={() => {
                  setCurrentUser(null);
                  toast.success("Logged out successfully");
                }}
              >
                Logout
              </Button>
            </>
          )}

          {/* Admin button */}
          {currentUser && profiles.some((p) => p.name === "Gerald sang" && p.email === currentUser.email) && (
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                Add tip
              </Button>
            </Link>
          )}

          {/* VIP button */}
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
