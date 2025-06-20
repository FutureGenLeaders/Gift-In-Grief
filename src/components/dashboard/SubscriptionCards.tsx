
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
            Free Access
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
            Guided Journey ($111/mo)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-300 text-sm mb-4">
            40 sessions dripped weekly + mindfulness mentoring
          </p>
          <Link to="/subscribe">
            <button className="w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-black rounded transition-colors font-semibold">
              Upgrade Now
            </button>
          </Link>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-red-900/40 to-red-800/40 border-red-700/30">
        <CardHeader>
          <CardTitle className="text-red-200 flex items-center">
            <Crown className="h-5 w-5 mr-2 text-red-400" />
            Sacred Transformation ($222/mo)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-300 text-sm mb-4">
            Complete 81-session journey + premium features
          </p>
          <Link to="/subscribe">
            <button className="w-full py-2 px-4 bg-red-800 hover:bg-red-900 text-white rounded transition-colors font-semibold">
              Transform Now
            </button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
