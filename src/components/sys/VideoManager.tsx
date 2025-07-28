import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Upload, 
  Video, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  CheckCircle, 
  Clock,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface HealingSession {
  id: string;
  title: string;
  description: string;
  duration: number;
  emotion: string;
  loss_type: string;
  tier_level: string;
  video_url: string | null;
  status: string;
  order_index: number;
  created_at: string;
}

const EMOTIONS = [
  "Loneliness", "Anger", "Despair", "Fear", "Guilt", 
  "Shame", "Sadness", "Overwhelm", "Numbness"
];

const LOSS_TYPES = [
  "Loss of Loved One", "Relationship Ending", "Job Loss", 
  "Health Loss", "Identity Loss", "Dreams/Goals Loss", 
  "Security Loss", "Faith Loss"
];

const TIER_LEVELS = [
  "Gentle Beginning", "Guided Journey", "Sacred Transformation", "All Tiers"
];

const VideoManager = () => {
  const [sessions, setSessions] = useState<HealingSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSession, setEditingSession] = useState<HealingSession | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    emotion: "",
    loss_type: "",
    tier_level: "",
    order_index: "",
    video_file: null as File | null
  });

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const { data, error } = await supabase
        .from("healing_sessions")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error("Error loading sessions:", error);
      toast({
        title: "Error",
        description: "Failed to load sessions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024 * 1024) { // 500MB limit
        toast({
          title: "File too large",
          description: "Video files must be under 500MB.",
          variant: "destructive",
        });
        return;
      }
      setFormData(prev => ({ ...prev, video_file: file }));
    }
  };

  const uploadVideo = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}-${file.name}`;
    
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const { data, error } = await supabase.storage
        .from("videos")
        .upload(fileName, file);

      if (error) throw error;

      setUploadProgress(100);
      clearInterval(progressInterval);
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("videos")
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      clearInterval(progressInterval);
      throw error;
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let videoUrl = editingSession?.video_url || null;

      // Upload video if provided
      if (formData.video_file) {
        videoUrl = await uploadVideo(formData.video_file);
      }

      const sessionData = {
        title: formData.title,
        description: formData.description,
        duration: parseInt(formData.duration),
        emotion: formData.emotion,
        loss_type: formData.loss_type,
        tier_level: formData.tier_level,
        order_index: parseInt(formData.order_index) || 0,
        video_url: videoUrl,
        status: "draft"
      };

      if (editingSession) {
        const { error } = await supabase
          .from("healing_sessions")
          .update(sessionData)
          .eq("id", editingSession.id);

        if (error) throw error;
        
        toast({
          title: "Session updated",
          description: "Video session has been updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from("healing_sessions")
          .insert([sessionData]);

        if (error) throw error;
        
        toast({
          title: "Session created",
          description: "New video session has been created successfully.",
        });
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        duration: "",
        emotion: "",
        loss_type: "",
        tier_level: "",
        order_index: "",
        video_file: null
      });
      setEditingSession(null);
      setShowForm(false);
      loadSessions();
    } catch (error) {
      console.error("Error saving session:", error);
      toast({
        title: "Error",
        description: "Failed to save session.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStatus = async (session: HealingSession) => {
    try {
      const newStatus = session.status === "published" ? "draft" : "published";
      
      const { error } = await supabase
        .from("healing_sessions")
        .update({ status: newStatus })
        .eq("id", session.id);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Session ${newStatus === "published" ? "published" : "unpublished"}.`,
      });
      
      loadSessions();
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update session status.",
        variant: "destructive",
      });
    }
  };

  const deleteSession = async (sessionId: string) => {
    if (!confirm("Are you sure you want to delete this session?")) return;

    try {
      const { error } = await supabase
        .from("healing_sessions")
        .delete()
        .eq("id", sessionId);

      if (error) throw error;

      toast({
        title: "Session deleted",
        description: "Video session has been deleted.",
      });
      
      loadSessions();
    } catch (error) {
      console.error("Error deleting session:", error);
      toast({
        title: "Error",
        description: "Failed to delete session.",
        variant: "destructive",
      });
    }
  };

  const startEdit = (session: HealingSession) => {
    setEditingSession(session);
    setFormData({
      title: session.title,
      description: session.description || "",
      duration: session.duration.toString(),
      emotion: session.emotion,
      loss_type: session.loss_type,
      tier_level: session.tier_level,
      order_index: session.order_index.toString(),
      video_file: null
    });
    setShowForm(true);
  };

  if (isLoading && sessions.length === 0) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="py-12">
          <div className="text-center text-gray-500">Loading video sessions...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Video Content Management</CardTitle>
              <CardDescription className="text-gray-400">
                Upload and manage healing session videos
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowForm(!showForm)}
              className="bg-yellow-600 hover:bg-yellow-700 text-black"
            >
              <Upload className="h-4 w-4 mr-2" />
              {showForm ? "Cancel" : "Add Session"}
            </Button>
          </div>
        </CardHeader>

        {showForm && (
          <CardContent className="border-t border-gray-800 pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-300">Session Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Enter session title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-gray-300">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="45"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Primary Emotion</Label>
                  <Select 
                    value={formData.emotion} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, emotion: value }))}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select emotion" />
                    </SelectTrigger>
                    <SelectContent>
                      {EMOTIONS.map((emotion) => (
                        <SelectItem key={emotion} value={emotion}>{emotion}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Loss Type</Label>
                  <Select 
                    value={formData.loss_type} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, loss_type: value }))}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select loss type" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOSS_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Tier Level</Label>
                  <Select 
                    value={formData.tier_level} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, tier_level: value }))}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIER_LEVELS.map((tier) => (
                        <SelectItem key={tier} value={tier}>{tier}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order" className="text-gray-300">Order Index</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData(prev => ({ ...prev, order_index: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Describe the session content and objectives..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="video" className="text-gray-300">Video File</Label>
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <p className="text-xs text-gray-500">Max file size: 500MB</p>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <Label className="text-gray-300">Upload Progress</Label>
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-xs text-gray-400">{uploadProgress}% uploaded</p>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isLoading || isUploading}
                className="bg-yellow-600 hover:bg-yellow-700 text-black"
              >
                {isLoading ? "Saving..." : editingSession ? "Update Session" : "Create Session"}
              </Button>
            </form>
          </CardContent>
        )}
      </Card>

      {/* Sessions List */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Existing Sessions</CardTitle>
          <CardDescription className="text-gray-400">
            Manage your healing session library
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No sessions created yet. Add your first session above.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-300">Title</TableHead>
                  <TableHead className="text-gray-300">Emotion</TableHead>
                  <TableHead className="text-gray-300">Tier</TableHead>
                  <TableHead className="text-gray-300">Duration</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow key={session.id} className="border-gray-800">
                    <TableCell className="text-white font-medium">
                      {session.title}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {session.emotion}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {session.tier_level}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {session.duration}m
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={session.status === "published" ? "default" : "secondary"}
                        className={session.status === "published" 
                          ? "bg-green-600 text-white" 
                          : "bg-gray-600 text-gray-300"
                        }
                      >
                        {session.status === "published" ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Published
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 mr-1" />
                            Draft
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(session)}
                          className="border-gray-600 text-gray-300 hover:text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleStatus(session)}
                          className="border-gray-600 text-gray-300 hover:text-white"
                        >
                          {session.status === "published" ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteSession(session.id)}
                          className="border-red-600 text-red-400 hover:text-white hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoManager;