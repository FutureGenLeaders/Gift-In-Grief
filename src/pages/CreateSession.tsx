
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

// WARNING: Type override for Supabase missing-type tables.
// For full type safety, re-generate your Supabase types after DB change.

export default function CreateSession() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [zoomLink, setZoomLink] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const { data: user } = await (supabase as any).auth.getUser();
    if (!user?.user?.id) {
      setMessage("You must be logged in to create a session.");
      setLoading(false);
      return;
    }
    const { error } = await (supabase as any).from("sessions").insert({
      title,
      description,
      zoom_link: zoomLink,
      start_time: start,
      end_time: end,
      created_by: user.user.id,
      is_public: true,
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Session created! Go to the Sessions page to view.");
      setTitle('');
      setDescription('');
      setZoomLink('');
      setStart('');
      setEnd('');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto pt-8">
      <h1 className="text-3xl font-bold mb-4">Create a New Session</h1>
      <form className="space-y-4" onSubmit={handleCreate}>
        <Input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Session Title" />
        <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Short Description" />
        <Input value={zoomLink} onChange={e => setZoomLink(e.target.value)} placeholder="Zoom link (https://...)" />
        <Input type="datetime-local" required value={start} onChange={e => setStart(e.target.value)} placeholder="Start Time" />
        <Input type="datetime-local" required value={end} onChange={e => setEnd(e.target.value)} placeholder="End Time" />
        <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Session"}</Button>
        {message && <div className="text-center text-sm pt-2 text-green-600">{message}</div>}
      </form>
    </div>
  );
}
