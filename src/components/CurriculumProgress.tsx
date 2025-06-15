
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface CurriculumModule {
  id: string;
  module_number: number;
  title: string;
  content: string;
  release_week: number;
}

interface UserProgressEntry {
  module_id: string;
  completed_at: string | null;
  unlocked_at: string;
}

function getWeeksSince(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
}

export default function CurriculumProgress({ joinDate, onComplete }: { joinDate: Date; onComplete?: () => void }) {
  const [modules, setModules] = useState<CurriculumModule[]>([]);
  const [progress, setProgress] = useState<Record<string, UserProgressEntry>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const weeksSinceJoin = getWeeksSince(joinDate);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      const { data: mods, error: modErr } = await supabase
        .from("curriculum_modules")
        .select("*")
        .order("release_week", { ascending: true });

      const { data: user } = await supabase.auth.getUser();
      const userId = user?.user?.id;

      let prog = null;
      let progErr = null;
      if (userId) {
        const { data, error } = await supabase
          .from("user_curriculum_progress")
          .select("*")
          .eq("user_id", userId);
        prog = data;
        progErr = error;
      }

      if (modErr) setError(modErr.message);
      if (progErr) setError(progErr.message);

      setModules(mods || []);
      const progMap: Record<string, UserProgressEntry> = {};
      (prog || []).forEach((p: any) => {
        progMap[p.module_id] = p;
      });
      setProgress(progMap);
      setLoading(false);
    }
    fetchData();
  }, [joinDate]);

  async function handleComplete(moduleId: string) {
    const { data: user } = await supabase.auth.getUser();
    if (!user?.user?.id) return;

    await supabase
      .from("user_curriculum_progress")
      .upsert([
        {
          user_id: user.user.id,
          module_id: moduleId,
          completed_at: new Date().toISOString(),
          unlocked_at: progress[moduleId]?.unlocked_at ?? new Date().toISOString(),
        },
      ]);

    setProgress((prev) => ({
      ...prev,
      [moduleId]: { 
        ...prev[moduleId], 
        module_id: moduleId,
        completed_at: new Date().toISOString(),
        unlocked_at: prev[moduleId]?.unlocked_at ?? new Date().toISOString()
      },
    }));

    const allComplete =
      modules.length > 0 &&
      modules
        .filter((m) => m.release_week <= weeksSinceJoin + 1)
        .every((m) => prev[m.id]?.completed_at || m.id === moduleId);

    if (allComplete && onComplete) {
      onComplete();
    }
  }

  return (
    <div className="bg-black/40 border border-yellow-900/20 rounded-xl p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-yellow-400 mb-5">Your 9-Month Curriculum Progress</h2>
      {loading ? (
        <div className="text-gray-400">Loading modules...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : (
        <div className="space-y-4">
          {modules
            .filter((m) => m.release_week <= weeksSinceJoin + 1)
            .map((m) => (
              <div
                key={m.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 py-2 border-b border-yellow-900/20"
              >
                <div>
                  <div className="font-semibold text-yellow-200">
                    {m.module_number}. {m.title}
                  </div>
                  <div className="text-gray-400 mb-2 text-sm">{m.content?.slice(0, 90)}...</div>
                </div>
                <div>
                  {progress[m.id]?.completed_at ? (
                    <span className="px-3 py-1 rounded bg-green-600/80 text-white text-xs font-bold">
                      Completed
                    </span>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-yellow-700 text-yellow-300"
                      onClick={() => handleComplete(m.id)}
                    >
                      Mark Complete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          {modules.length === 0 && (
            <div className="text-gray-400">No modules loaded yet.</div>
          )}
        </div>
      )}
      <div className="pt-3 text-xs text-gray-400">
        Modules unlock every week from your join date.
      </div>
    </div>
  );
}
