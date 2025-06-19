
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const tiers = [
  {
    name: "Gold",
    gradient: "from-yellow-400 via-yellow-600 to-yellow-800",
    border: "border-yellow-400",
    text: "text-yellow-200",
    description:
      "Access to essential grief healing resources and daily emotional sovereignty practices. Begin your transformation with mindfulness mentoring sessions and community support for navigating loss consciously.",
    recommended: false,
  },
  {
    name: "Silver",
    gradient: "from-slate-300 via-gray-400 to-gray-700",
    border: "border-zinc-300",
    text: "text-white",
    description:
      "All Gold features plus advanced emotional intelligence analytics, personalized grief protocols, and exclusive healing circles. For those ready to dive deeper into conscious grief transformation and emotional sovereignty development.",
    recommended: true,
  },
  {
    name: "VIP Red",
    gradient: "from-red-600 via-red-700 to-yellow-700",
    border: "border-red-600",
    text: "text-yellow-100",
    description:
      "Complete emotional sovereignty experience: everything in Silver plus 1:1 mindfulness mentoring, exclusive transformation events, and on-call emotional intelligence advisors. For those committed to complete grief-to-wisdom transformation.",
    recommended: false,
  },
];

export default function Subscribe() {
  const navigate = useNavigate();

  async function handleSubscribeClick(tier: string) {
    toast({
      title: "Connecting to secure checkout...",
      description: `Preparing your ${tier} grief healing membership with 2-week free trial.`,
    });
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { tier },
      });
      if (error) {
        toast({ title: "Error", description: error.message || "Payment setup error." });
        return;
      }
      if (!data?.url) {
        toast({ title: "Error", description: "No payment link received." });
        return;
      }
      // Open payment in a new tab
      window.open(data.url, "_blank");
    } catch (e) {
      toast({ title: "Error", description: (e as Error).message });
    }
  }

  return (
    <main className="min-h-screen bg-black w-full flex flex-col items-center py-10 px-3">
      <div className="max-w-6xl mx-auto w-full">
        <h1 className="text-3xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-500 via-red-600 to-yellow-300 bg-clip-text text-transparent">
          The Gift in Grief Transformation Membership
        </h1>
        <p className="text-gray-300 text-lg mb-10 text-center max-w-3xl mx-auto font-light leading-relaxed">
          Choose your emotional sovereignty membership level. All subscriptions include full access to mindfulness mentoring sessions, 
          comprehensive grief healing tools, weekly support, and a <strong className="text-yellow-600">2-week free trial</strong> to experience the healing magic before you invest.
        </p>
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "group relative rounded-2xl border-2 cursor-pointer shadow-xl hover:scale-105 transition-transform bg-gradient-to-br p-1",
                `bg-gradient-to-br ${tier.gradient}`,
                tier.border
              )}
              onClick={() => handleSubscribeClick(tier.name)}
              style={{ minHeight: 420 }}
            >
              <div className="h-full flex flex-col rounded-2xl bg-black/80 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-2xl font-bold ${tier.text}`}>{tier.name}</span>
                  {tier.recommended && (
                    <span className="bg-yellow-600/90 text-white text-xs rounded-full px-3 py-1 ml-2 shadow-md font-semibold">
                      Most Popular
                    </span>
                  )}
                </div>
                <div className="mb-6 flex-grow">
                  <p className={cn("text-base leading-relaxed", tier.text)}>{tier.description}</p>
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
                    Start 2-Week Free Trial
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto font-light leading-relaxed">
            Begin your journey to emotional sovereignty with no risk. Experience personalized grief healing, 
            mindfulness mentoring sessions, and supportive community for 14 days completely free.
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
