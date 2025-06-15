
import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

export default function ProfileLink() {
  return (
    <div className="text-center">
      <Link to="/profile" className="inline-flex items-center text-yellow-600 hover:text-yellow-400 font-semibold">
        <User className="h-5 w-5 mr-2" />
        My Profile & Progress
      </Link>
    </div>
  );
}
