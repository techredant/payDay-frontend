import { Check, Crown, Smartphone, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

const plans = [
  {
    name: "Weekly VIP",
    price: "KES 500",
    period: "per week",
    features: [
      "5-10 VIP picks daily",
      "85%+ win rate tips",
      "WhatsApp group access",
      "Live match updates",
      "24/7 support",
    ],
    popular: false,
  },
  {
    name: "Monthly VIP",
    price: "KES 1,500",
    period: "per month",
    features: [
      "All Weekly features",
      "Premium accumulator tips",
      "Bankroll management guide",
      "Priority support",
      "Exclusive mega odds picks",
      "Early access to tips",
    ],
    popular: true,
  },
  {
    name: "1 Year VIP",
    price: "KES 5,000",
    period: "one-time",
    features: [
      "All Monthly features",
      "Forever VIP access",
      "Personal betting coach",
      "Custom stake advice",
      "Private 1-on-1 channel",
      "Bonus tips & promos",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  const handlePayment = (plan: string) => {
    const message = encodeURIComponent(
      `Hi! I want to subscribe to the ${plan} plan on Payday Picks. Please send me the M-Pesa payment details.`
    );
    window.open(`https://wa.me/+254711871225?text=${message}`, "_blank");
  };

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(43_96%_56%/0.08),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Unlock <span className="text-gradient-gold">VIP Access</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our exclusive VIP community and get access to premium picks with the highest win rates.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "gradient-card border-primary/50 shadow-gold scale-105"
                  : "bg-card border-border/50 shadow-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 gradient-gold rounded-full text-sm font-bold text-primary-foreground flex items-center gap-1">
                  <Crown className="w-4 h-4" />
                  MOST POPULAR
                </div>
              )}

              <div className="text-center mb-6 pt-4">
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-heading font-bold text-gradient-gold">
                    {plan.price}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "vip" : "outline"}
                className="w-full"
                onClick={() => handlePayment(plan.name)}
              >
                Subscribe Now
              </Button>
            </div>
          ))}
        </div>

        {/* Payment Info */}
        <div className="max-w-2xl mx-auto">
          <div className="gradient-card rounded-2xl p-8 border border-primary/20 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Smartphone className="w-8 h-8 text-success" />
              <h3 className="text-2xl font-heading font-bold text-foreground">
                Pay via M-Pesa
              </h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Fast, secure, and instant activation. Click subscribe and we'll send you payment details via WhatsApp.
            </p>
            <div className="flex items-center justify-center gap-2 text-lg">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span className="text-foreground font-semibold">
                WhatsApp: +254711871225
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
