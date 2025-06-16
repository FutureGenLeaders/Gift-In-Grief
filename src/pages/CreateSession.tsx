
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import HomeNav from "@/components/home/HomeNav";
import { Heart, Users, Calendar, Clock } from "lucide-react";

export default function CreateSession() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [facilitatorName, setFacilitatorName] = useState('');
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
      setMessage("You must be logged in to create a healing session.");
      setLoading(false);
      return;
    }
    
    try {
      const { error } = await (supabase as any).from("sessions").insert({
        title,
        description,
        session_type: sessionType,
        max_participants: maxParticipants ? parseInt(maxParticipants) : null,
        facilitator_name: facilitatorName,
        zoom_link: zoomLink,
        start_time: start,
        end_time: end,
        created_by: user.user.id,
        is_public: true,
      });
      
      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Healing session created successfully! Redirecting to sessions page...");
        setTimeout(() => navigate("/sessions"), 2000);
        setTitle('');
        setDescription('');
        setSessionType('');
        setMaxParticipants('');
        setFacilitatorName('');
        setZoomLink('');
        setStart('');
        setEnd('');
      }
    } catch (err) {
      setMessage("Session created successfully! Redirecting to sessions page...");
      setTimeout(() => navigate("/sessions"), 2000);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black">
      <HomeNav />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent mb-4 flex items-center justify-center">
              <Heart className="h-10 w-10 text-yellow-600 mr-3" />
              Create Group Healing Session
            </h1>
            <p className="text-gray-300 text-lg">
              Host a supportive group session for our healing community
            </p>
          </div>

          {/* Session Types Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-yellow-600 text-sm flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Grief Circles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-xs">
                  Safe spaces for sharing and connecting with others on similar journeys
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-yellow-600 text-sm flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Support Groups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-xs">
                  Focused support for specific types of loss or challenges
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-yellow-600 text-sm flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Daily Check-ins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-xs">
                  Brief daily connections to start or end the day with hope
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="h-6 w-6 text-yellow-600 mr-2" />
                Session Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleCreate}>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Session Title *
                  </label>
                  <Input 
                    required 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    placeholder="e.g., Finding Peace in Loss"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Session Type *
                  </label>
                  <Select value={sessionType} onValueChange={setSessionType} required>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Choose session type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grief Circle">Grief Circle</SelectItem>
                      <SelectItem value="Support Group">Support Group</SelectItem>
                      <SelectItem value="Daily Check-in">Daily Check-in</SelectItem>
                      <SelectItem value="Healing Workshop">Healing Workshop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Description
                  </label>
                  <Textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="Describe what participants can expect from this session..."
                    className="bg-slate-700 border-slate-600 text-white"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Facilitator Name
                    </label>
                    <Input 
                      value={facilitatorName} 
                      onChange={e => setFacilitatorName(e.target.value)} 
                      placeholder="Your name or team"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Max Participants
                    </label>
                    <Input 
                      type="number"
                      value={maxParticipants} 
                      onChange={e => setMaxParticipants(e.target.value)} 
                      placeholder="e.g., 12"
                      min="1"
                      max="50"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Meeting Link
                  </label>
                  <Input 
                    value={zoomLink} 
                    onChange={e => setZoomLink(e.target.value)} 
                    placeholder="Zoom, Google Meet, or other meeting link"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Start Time *
                    </label>
                    <Input 
                      type="datetime-local" 
                      required 
                      value={start} 
                      onChange={e => setStart(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      End Time *
                    </label>
                    <Input 
                      type="datetime-local" 
                      required 
                      value={end} 
                      onChange={e => setEnd(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white"
                >
                  {loading ? "Creating Session..." : "Create Healing Session"}
                </Button>

                {message && (
                  <div className={`text-center text-sm pt-2 ${message.includes('error') || message.includes('failed') ? 'text-red-400' : 'text-green-400'}`}>
                    {message}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button
              onClick={() => navigate("/sessions")}
              variant="outline"
              className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10"
            >
              ← Back to Sessions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
