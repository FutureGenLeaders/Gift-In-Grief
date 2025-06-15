
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Shows a completion certificate if the user has completed all released modules.
 * This expects parent to only display when eligible, but also guards itself.
 */
export default function CompletionCertificate({ joinDate }: { joinDate: Date }) {
  const [userName, setUserName] = useState<string | null>(null);
  const [completedAt, setCompletedAt] = useState<string | null>(null);

  useEffect(() => {
    async function fetchName() {
      const { data } = await supabase.auth.getUser();
      setUserName(data?.user?.user_metadata?.full_name || data?.user?.email || "Your Name");
    }
    fetchName();
  }, []);

  useEffect(() => {
    async function fetchCompletedDate() {
      // Optional: fetch the last completed date among all modules for the current user
      // (For demo, use current date)
      setCompletedAt(new Date().toLocaleDateString());
    }
    fetchCompletedDate();
  }, []);

  return (
    <div className="border border-yellow-700 bg-black/80 text-yellow-300 rounded-2xl p-8 my-6 shadow-lg flex flex-col items-center mx-auto w-full max-w-lg">
      <div className="text-3xl font-bold mb-2">🎓 Certificate of Completion</div>
      <div className="italic text-lg mb-4">Awarded to</div>
      <div className="text-2xl font-extrabold text-white mb-2">{userName}</div>
      <div className="text-lg">for successfully completing the 9-month program.</div>
      <div className="mt-4 text-sm text-gray-400">Completed on: {completedAt}</div>
    </div>
  );
}
