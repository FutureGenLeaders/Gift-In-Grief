
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Basic",
    price: 55,
    displayName: "Gentle Beginning",
    gradient: "from-yellow-600 via-yellow-700 to-yellow-800",
    border: "border-yellow-600",
    text: "text-yellow-100",
    description: "Start your healing journey with gentle, weekly guidance delivered at a sustainable pace for lasting transformation.",
    features: [
      "2 healing sessions delivered weekly",
      "Group healing circles for community support",
      "Foundation community access",
      "Mobile healing companion",
      "14-day free trial"
    ],
    recommended: false,
  },
  {
    name: "Complete",
    price: 111,
    displayName: "Guided Journey",
    gradient: "from-red-800 via-red-900 to-yellow-700",
    border: "border-red-800",
    text: "text-yellow-100",
    description: "Experience deeper healing with 40 sessions dripped weekly over 10 months, delivered at your perfect healing pace.",
    features: [
      "40 healing sessions dripped weekly over 10 months",
      "1 mindfulness mentoring session monthly",
      "All healing circles and community features",
      "Enhanced progress tracking",
      "Priority community access",
      "14-day free trial"
    ],
    recommended: true,
  },
  {
    name: "Transformation", 
    price: 222,
    displayName: "Sacred Transformation",
    gradient: "from-yellow-700 via-red-800 to-yellow-600",
    border: "border-yellow-700",
    text: "text-black",
    description: "Embrace your complete transformation with 81 sessions delivered weekly over 20+ months for profound, lasting change.",
    features: [
      "81 healing sessions delivered weekly over 20+ months",
      "2 mindfulness mentoring sessions monthly",
      "All premium healing features",
      "Advanced transformation tools",
      "Sacred circle priority support",
      "Exclusive transformation community",
      "14-day free trial"
    ],
    recommended: false,
  },
];

export default function Subscribe() {
  const navigate = useNavigate();

  async function handleSubscribeClick(tier: string) {
    toast({
      title: "Connecting to secure checkout...",
      description: `Preparing your ${tier} subscription with 14-day free trial.`,
    });
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { tier },
      });
      if (error) {
        console.error("Subscription error:", error);
        toast({ 
          title: "Subscription Error", 
          description: error.message || "Unable to process subscription. Please try again.",
          variant: "destructive"
        });
        return;
      }
      if (!data?.url) {
        toast({ 
          title: "Error", 
          description: "No payment link received. Please try again.",
          variant: "destructive"
        });
        return;
      }
      window.open(data.url, "_blank");
    } catch (e) {
      console.error("Subscription processing error:", e);
      toast({ 
        title: "Error", 
        description: "Unable to process subscription. Please check your connection and try again.",
        variant: "destructive"
      });
    }
  }

  return (
    <main className="min-h-screen bg-black w-full flex flex-col items-center py-10 px-3">
      <div className="max-w-6xl mx-auto w-full">
        <h1 className="text-3xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-600 via-red-800 to-yellow-400 bg-clip-text text-transparent">
          Transform Your Grief Into Wisdom & Strength
        </h1>
        <p className="text-gray-300 text-lg mb-10 text-center max-w-3xl mx-auto font-light leading-relaxed">
          Choose your healing journey level. All subscriptions include comprehensive grief transformation tools delivered weekly, 
          community support, and a <strong className="text-yellow-600">14-day free trial</strong> to experience the healing before you invest.
        </p>

        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "group relative rounded-2xl border-2 cursor-pointer shadow-xl hover:scale-105 transition-transform bg-gradient-to-br p-1",
                `bg-gradient-to-br ${tier.gradient}`,
                tier.border
              )}
              onClick={() => handleSubscribeClick(tier.name)}
              style={{ minHeight: 500 }}
            >
              <div className="h-full flex flex-col rounded-2xl bg-black/80 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-2xl font-bold ${tier.text}`}>{tier.displayName}</span>
                  {tier.recommended && (
                    <span className="bg-yellow-600/90 text-black text-xs rounded-full px-3 py-1 ml-2 shadow-md font-semibold">
                      Most Popular
                    </span>
                  )}
                </div>
                
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${tier.text}`}>${tier.price}</span>
                  <span className="text-gray-400 text-lg">/month</span>
                </div>

                <div className="mb-6 flex-grow">
                  <p className={cn("text-sm leading-relaxed mb-4", tier.text)}>{tier.description}</p>
                  <ul className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <li key={index} className={cn("text-sm flex items-start", tier.text)}>
                        <span className="text-yellow-400 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-center">
                  <span
                    className={cn(
                      "mt-6 block px-6 py-3 rounded-full font-semibold text-sm shadow transition group-hover:bg-opacity-70",
                      "bg-black/30",
                      tier.text,
                      "border border-white/10"
                    )}
                  >
                    Start 14-Day Free Trial
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Individual Sessions for Non-Subscribers */}
        <div className="bg-gradient-to-r from-yellow-900/20 to-red-900/20 border border-yellow-700/30 rounded-lg p-6 mb-8">
          <h3 className="text-yellow-200 font-medium text-xl mb-4">Individual Mindfulness Mentoring Sessions</h3>
          <p className="text-yellow-200 font-light mb-4">
            Not ready for a subscription? Purchase individual self-guided mentoring sessions for deep emotional work.
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-yellow-600">$55</span>
              <span className="text-gray-400 ml-2">per session</span>
            </div>
            <Link to="/sessions">
              <button className="bg-yellow-600 hover:bg-yellow-700 text-black px-6 py-2 rounded-lg transition-colors font-semibold">
                Browse Sessions
              </button>
            </Link>
          </div>
        </div>

        {/* Bulk Ordering CTA */}
        <div className="bg-gradient-to-r from-red-900/20 to-yellow-900/20 border border-red-600/30 rounded-lg p-6 mb-8">
          <h3 className="text-red-200 font-medium text-xl mb-4">Organizational & Bulk Orders</h3>
          <p className="text-red-200 font-light mb-4">
            Support your team, clients, or organization with volume pricing and enterprise features.
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-red-300">Volume discounts up to 45% off</span>
            </div>
            <Link to="/bulk-orders">
              <button className="bg-red-800 hover:bg-red-900 text-white px-6 py-2 rounded-lg transition-colors font-semibold">
                Get Volume Pricing
              </button>
            </Link>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto font-light leading-relaxed">
            Begin your journey to emotional sovereignty with no risk. Experience personalized grief healing, 
            mindfulness mentoring, and supportive community for 14 days completely free.
          </p>
          <button
            className="text-gray-500 hover:text-gray-200 underline font-light"
            onClick={() => navigate("/")}
          >
            ← Return to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
