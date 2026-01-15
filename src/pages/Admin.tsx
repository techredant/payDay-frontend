import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Edit, 
  Trophy, 
  TrendingUp, 
  Users, 
  DollarSign,
  ArrowLeft,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface Tip {
  id: number;
  homeTeam: string;
  awayTeam: string;
  league: string;
  prediction: string;
  odds: string;
  confidence: number;
  time: string;
  isVip: boolean;
  status: "pending" | "won" | "lost";
}

const Admin = () => {
  const [tips, setTips] = useState<Tip[]>([
    {
      id: 1,
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      league: "Premier League",
      prediction: "Over 2.5 Goals",
      odds: "1.85",
      confidence: 78,
      time: "Today, 17:30",
      isVip: false,
      status: "pending",
    },
    {
      id: 2,
      homeTeam: "Man United",
      awayTeam: "Liverpool",
      league: "Premier League",
      prediction: "BTTS - Yes",
      odds: "2.10",
      confidence: 92,
      time: "Today, 16:00",
      isVip: true,
      status: "pending",
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newTip, setNewTip] = useState({
    homeTeam: "",
    awayTeam: "",
    league: "",
    prediction: "",
    odds: "",
    confidence: 75,
    time: "",
    isVip: false,
  });

  const handleAddTip = () => {
    if (!newTip.homeTeam || !newTip.awayTeam || !newTip.prediction) return;
    
    setTips([
      ...tips,
      {
        ...newTip,
        id: Date.now(),
        status: "pending",
      },
    ]);
    setNewTip({
      homeTeam: "",
      awayTeam: "",
      league: "",
      prediction: "",
      odds: "",
      confidence: 75,
      time: "",
      isVip: false,
    });
    setIsAdding(false);
  };

  const handleDeleteTip = (id: number) => {
    setTips(tips.filter((tip) => tip.id !== id));
  };

  const handleUpdateStatus = (id: number, status: "won" | "lost") => {
    setTips(
      tips.map((tip) => (tip.id === id ? { ...tip, status } : tip))
    );
  };

  const stats = [
    { label: "Total Tips", value: tips.length, icon: TrendingUp },
    { label: "VIP Tips", value: tips.filter((t) => t.isVip).length, icon: Trophy },
    { label: "Won", value: tips.filter((t) => t.status === "won").length, icon: Check },
    { label: "Pending", value: tips.filter((t) => t.status === "pending").length, icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Admin Panel
              </h1>
              <p className="text-muted-foreground">Manage your betting tips</p>
            </div>
          </div>
          <Button variant="vip" onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4" />
            Add Tip
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 rounded-xl gradient-card border border-border/50 shadow-card"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-heading font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Tip Form */}
        {isAdding && (
          <div className="mb-8 p-6 rounded-xl gradient-card border border-primary/30 shadow-gold">
            <h3 className="text-lg font-heading font-bold text-foreground mb-4">
              Add New Tip
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Input
                placeholder="Home Team"
                value={newTip.homeTeam}
                onChange={(e) => setNewTip({ ...newTip, homeTeam: e.target.value })}
              />
              <Input
                placeholder="Away Team"
                value={newTip.awayTeam}
                onChange={(e) => setNewTip({ ...newTip, awayTeam: e.target.value })}
              />
              <Input
                placeholder="League"
                value={newTip.league}
                onChange={(e) => setNewTip({ ...newTip, league: e.target.value })}
              />
              <Input
                placeholder="Match Time"
                value={newTip.time}
                onChange={(e) => setNewTip({ ...newTip, time: e.target.value })}
              />
              <Input
                placeholder="Prediction"
                value={newTip.prediction}
                onChange={(e) => setNewTip({ ...newTip, prediction: e.target.value })}
              />
              <Input
                placeholder="Odds"
                value={newTip.odds}
                onChange={(e) => setNewTip({ ...newTip, odds: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Confidence %"
                value={newTip.confidence}
                onChange={(e) => setNewTip({ ...newTip, confidence: parseInt(e.target.value) })}
              />
              <label className="flex items-center gap-2 text-foreground">
                <input
                  type="checkbox"
                  checked={newTip.isVip}
                  onChange={(e) => setNewTip({ ...newTip, isVip: e.target.checked })}
                  className="w-4 h-4 accent-primary"
                />
                VIP Tip
              </label>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleAddTip}>Save Tip</Button>
              <Button variant="ghost" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Tips List */}
        <div className="space-y-4">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className={`p-4 rounded-xl border transition-all ${
                tip.isVip
                  ? "gradient-card border-primary/30"
                  : "bg-card border-border/50"
              } ${tip.status === "won" && "border-success/50"} ${
                tip.status === "lost" && "border-destructive/30 opacity-60"
              }`}
            > 
            {tip.isVip && (
                    <span className="px-2 py-1 text-xs font-bold gradient-gold text-primary-foreground rounded">
                      VIP
                    </span>
                  )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                 
                  <div>
                    <div className="font-semibold text-foreground">
                      {tip.homeTeam} vs {tip.awayTeam}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {tip.league} • {tip.time}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-semibold text-primary">{tip.prediction}</div>
                    <div className="text-sm text-muted-foreground">
                      Odds: {tip.odds} | {tip.confidence}%
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {tip.status === "pending" ? (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-success hover:text-success hover:bg-success/10"
                          onClick={() => handleUpdateStatus(tip.id, "won")}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleUpdateStatus(tip.id, "lost")}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <span
                        className={`px-2 py-1 text-xs font-bold rounded ${
                          tip.status === "won"
                            ? "bg-success/20 text-success"
                            : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {tip.status.toUpperCase()}
                      </span>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteTip(tip.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
