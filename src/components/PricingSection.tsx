import { Check, Crown, Smartphone, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
  import { useEffect } from "react";
const plans = [
  {
    name: "Weekly VIP",
    price: "500",
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
    price: "1500",
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
    price: "5000",
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
    const [loadingPlan, setLoadingPlan] = useState(null);
  

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log("Logged-in user:", user.id);
}, []);

const handlePayment = async (plan: any) => {
  const phone = prompt("Enter M-Pesa number (07XXXXXXXX)");
  if (!phone) return;

  setLoadingPlan(plan.name);

  // Convert to MPESA format
  const formattedPhone = phone.startsWith("07")
    ? "254" + phone.slice(1)
    : phone;

  // Remove KES from amount
  const amount = Number(plan.price);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
 
  if (!user._id) {
  alert("Please login again");
  return;
}


  try {
    const res = await fetch(
      "https://pay-day-backend.vercel.app/api/mpesa/stk-push",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formattedPhone,
          plan: plan.name,
          amount, 
          userId: user?.id,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      const error = await res.json();
      alert("Payment failed: " + data.message);
      return;
    }

    alert("STK Push sent. Enter your PIN.");
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoadingPlan(null);
  }
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
                onClick={() => handlePayment(plan)}
              >
                {loadingPlan === plan.name ? "Processing..." : "Subscribe Now"}

              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
