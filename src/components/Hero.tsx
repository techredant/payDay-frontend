import { TrendingUp, Star, Zap } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(43_96%_56%/0.1),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-success/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-primary/20 mb-8 animate-slide-up">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Premium Sports Betting Tips</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 animate-slide-up">
          Win Big with
          <br />
          <span className="text-gradient-gold">Payday Picks</span>
          <span className="inline-block ml-4">🌠</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up">
          Expert betting tips with a proven track record. Join thousands of winners 
          getting daily picks that turn small stakes into big paydays.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up">
          <a href="#tips">
            <Button size="lg" variant="outline">
              <TrendingUp className="w-5 h-5" />
              View Free Tips
            </Button>
          </a>
          <a href="#pricing">
            <Button size="lg" variant="vip">
              <Star className="w-5 h-5" />
              Unlock VIP Access
            </Button>
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-slide-up">
          {[
            { value: "85%", label: "Win Rate" },
            { value: "5K+", label: "Members" },
            { value: "12K+", label: "Tips Sent" },
            { value: "KES 2M+", label: "Won by Members" },
          ].map((stat, index) => (
            <div key={index} className="p-6 rounded-xl gradient-card border border-border/50 shadow-card">
              <div className="text-3xl md:text-4xl font-heading font-bold text-gradient-gold mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
