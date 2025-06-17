
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
      "Access to core healing resources and daily emotional intelligence practices. Unlock essential tools for grief transformation with community support.",
    recommended: false,
  },
  {
    name: "Silver",
    gradient: "from-slate-300 via-gray-400 to-gray-700",
    border: "border-zinc-300",
    text: "text-white",
    description:
      "All Gold features plus advanced healing analytics, personalized grief protocols, and exclusive healing circles. For those seeking deeper transformation.",
    recommended: true,
  },
  {
    name: "VIP Red",
    gradient: "from-red-600 via-red-700 to-yellow-700",
    border: "border-red-600",
    text: "text-yellow-100",
    description:
      "Ultimate healing experience: everything in Silver plus 1:1 mindfulness mentoring, exclusive events, and on-call emotional intelligence advisors.",
    recommended: false,
  },
];

export default function Subscribe() {
  const navigate = useNavigate();

  async function handleSubscribeClick(tier: string) {
    toast({
      title: "Connecting to payment...",
      description: `Preparing your ${tier} healing membership checkout.`,
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
      <h1 className="text-3xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-500 via-red-600 to-yellow-300 bg-clip-text text-transparent">
        The Gift in Grief Membership
      </h1>
      <p className="text-gray-300 text-lg mb-10 text-center max-w-2xl">
        Choose your healing membership level. All subscriptions include full access to emotional intelligence tools, mindfulness mentoring sessions, weekly healing support, and a <b>2-week free trial</b> before you are billed.
      </p>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "group relative rounded-2xl border-2 cursor-pointer shadow-xl hover:scale-105 transition-transform bg-gradient-to-br p-1",
              `bg-gradient-to-br ${tier.gradient}`,
              tier.border
            )}
            onClick={() => handleSubscribeClick(tier.name)}
            style={{ minHeight: 380 }}
          >
            <div className="h-full flex flex-col rounded-2xl bg-black/80 p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-2xl font-bold ${tier.text}`}>{tier.name}</span>
                {tier.recommended && (
                  <span className="bg-yellow-600/90 text-white text-xs rounded-full px-3 py-1 ml-2 shadow-md font-semibold">
                    Recommended
                  </span>
                )}
              </div>
              <div className="mb-6">
                <p className={cn("text-base", tier.text)}>{tier.description}</p>
              </div>
              <div className="flex-grow" />
              <div className="flex justify-center">
                <span
                  className={cn(
                    "mt-6 block px-4 py-2 rounded-full font-semibold text-sm shadow transition group-hover:bg-opacity-70",
                    "bg-black/30",
                    tier.text,
                    "border border-white/10"
                  )}
                >
                  Click to subscribe — 2 week free trial
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-14 text-gray-500 hover:text-gray-200 underline"
        onClick={() => navigate("/")}
      >
        Go back
      </button>
    </main>
  );
}
