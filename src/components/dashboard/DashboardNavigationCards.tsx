
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Calendar } from "lucide-react";

export default function DashboardNavigationCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Link to="/masterclass" className="block">
        <Card className="bg-gradient-to-r from-purple-900/40 to-purple-800/40 border-purple-700/30 hover:scale-105 transition-transform cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-200">
              <BookOpen className="h-6 w-6 mr-2" />
              Masterclass Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-purple-300 text-sm">
              Access our comprehensive library of leadership masterclasses and nervous system training.
            </p>
          </CardContent>
        </Card>
      </Link>
      <Link to="/community" className="block">
        <Card className="bg-gradient-to-r from-green-900/40 to-green-800/40 border-green-700/30 hover:scale-105 transition-transform cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center text-green-200">
              <Users className="h-6 w-6 mr-2" />
              Sacred Circle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-300 text-sm">
              Connect with fellow leaders in our private community space for support and growth.
            </p>
          </CardContent>
        </Card>
      </Link>
      <Link to="/sessions" className="block">
        <Card className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 border-blue-700/30 hover:scale-105 transition-transform cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-200">
              <Calendar className="h-6 w-6 mr-2" />
              Strategic Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-300 text-sm">
              Book 1:1 coaching sessions and group workshops to accelerate your development.
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
