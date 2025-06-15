
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

export default function SubscriptionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Crown className="h-5 w-5 mr-2 text-gray-400" />
            Basic (Free)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 text-sm mb-4">
            Access to core content and daily protocols
          </p>
          <button className="w-full py-2 px-4 bg-gray-600 text-gray-400 rounded cursor-not-allowed">
            Current Plan
          </button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-yellow-900/40 to-yellow-800/40 border-yellow-700/30">
        <CardHeader>
          <CardTitle className="text-yellow-200 flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Premium ($49/mo)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-300 text-sm mb-4">
            Unlock advanced content and 1:1 sessions
          </p>
          <Link to="/subscribe">
            <button className="w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded transition-colors">
              Upgrade Now
            </button>
          </Link>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-red-900/40 to-red-800/40 border-red-700/30">
        <CardHeader>
          <CardTitle className="text-red-200 flex items-center">
            <Crown className="h-5 w-5 mr-2 text-red-400" />
            Executive ($499/mo)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-300 text-sm mb-4">
            All features + private coaching and priority support
          </p>
          <Link to="/subscribe">
            <button className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded transition-colors">
              Go Executive
            </button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
