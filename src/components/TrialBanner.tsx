
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Clock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TrialInfo {
  daysLeft: number;
  isExpired: boolean;
  isActive: boolean;
}

export default function TrialBanner() {
  const [trialInfo, setTrialInfo] = useState<TrialInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrialInfo() {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) return;

      const { data: profile } = await (supabase as any)
        .from("user_profiles")
        .select("trial_start_date, trial_end_date, subscription_status")
        .eq("user_id", user.user.id)
        .maybeSingle();

      if (profile && profile.subscription_status === 'trial') {
        const now = new Date();
        const endDate = new Date(profile.trial_end_date);
        const diffTime = endDate.getTime() - now.getTime();
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setTrialInfo({
          daysLeft: Math.max(0, daysLeft),
          isExpired: daysLeft <= 0,
          isActive: daysLeft > 0
        });
      }
      setLoading(false);
    }

    fetchTrialInfo();
  }, []);

  if (loading || !trialInfo || (!trialInfo.isActive && !trialInfo.isExpired)) {
    return null;
  }

  if (trialInfo.isExpired) {
    return (
      <div className="bg-gradient-to-r from-red-900/60 to-red-800/60 border border-red-600/50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-red-300 mr-2" />
            <div>
              <h3 className="font-semibold text-red-100">Trial Expired</h3>
              <p className="text-sm text-red-200">Your free trial has ended. Upgrade to continue your journey.</p>
            </div>
          </div>
          <Link to="/subscribe">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Upgrade Now
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-900/60 to-purple-900/60 border border-blue-600/50 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Crown className="h-5 w-5 text-blue-300 mr-2" />
          <div>
            <h3 className="font-semibold text-blue-100">Free Trial Active</h3>
            <p className="text-sm text-blue-200">
              {trialInfo.daysLeft} day{trialInfo.daysLeft !== 1 ? 's' : ''} left in your trial
            </p>
          </div>
        </div>
        <Link to="/subscribe">
          <Button variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-900/50">
            Upgrade
          </Button>
        </Link>
      </div>
    </div>
  );
}
