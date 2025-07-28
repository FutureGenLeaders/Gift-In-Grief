import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Users, 
  CreditCard, 
  Video, 
  Upload, 
  Eye,
  AlertTriangle,
  LogOut,
  DollarSign,
  Play
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import VideoManager from "@/components/sys/VideoManager";
import UserManager from "@/components/sys/UserManager";

const SystemDashboard = () => {
  const [adminData, setAdminData] = useState<any>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    completedSessions: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [panicMode, setPanicMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthorization();
    loadDashboardData();
  }, []);

  const checkAuthorization = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/admin/hidden-secure-portal-2024");
      return;
    }

    // Check if user is a system operator
    const { data: managerData, error } = await supabase
      .from("system_managers")
      .select("*")
      .eq("email", user.email)
      .eq("is_active", true)
      .maybeSingle();

    if (error || !managerData) {
      toast({
        title: "Access Denied",
        description: "Unauthorized access detected.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setAdminData(managerData);
  };

  const loadDashboardData = async () => {
    try {
      // Get completed sessions
      const { count: sessionCount } = await supabase
        .from("user_sessions")
        .select("*", { count: "exact", head: true })
        .not("completed_at", "is", null);

      // Get total healing sessions
      const { count: healingSessionCount } = await supabase
        .from("healing_sessions")
        .select("*", { count: "exact", head: true });

      setStats({
        totalUsers: 0, // Placeholder - would need auth.users access
        activeSubscriptions: 0, // This would come from Stripe data
        monthlyRevenue: 0, // This would come from payment records
        completedSessions: sessionCount || 0
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast({
      title: "Logged out",
      description: "Session ended securely.",
    });
  };

  const activatePanicMode = () => {
    setPanicMode(true);
    toast({
      title: "Panic Mode Activated",
      description: "All admin activities logged and secured.",
      variant: "destructive",
    });
    // In a real app, this would trigger emergency protocols
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-500">Loading system panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-yellow-500" />
            <div>
              <h1 className="text-xl font-light">Management Panel</h1>
              <p className="text-sm text-gray-400">System Operator Interface</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium">{adminData?.name}</p>
              <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-500">
                {adminData?.role}
              </Badge>
            </div>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={activatePanicMode}
              className="bg-red-600 hover:bg-red-700"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Panic
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </div>
        </div>
      </header>

      {panicMode && (
        <Alert className="m-6 bg-red-900/50 border-red-700">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-300">
            PANIC MODE ACTIVE: All activities are being logged and monitored. Contact emergency support if needed.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
              <Users className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Subscriptions</CardTitle>
              <CreditCard className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.activeSubscriptions}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.monthlyRevenue}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Completed Sessions</CardTitle>
              <Play className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.completedSessions}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Interface */}
        <Tabs defaultValue="videos" className="space-y-4">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="videos" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black">
              <Video className="h-4 w-4 mr-2" />
              Video Management
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black">
              <Users className="h-4 w-4 mr-2" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black">
              <Upload className="h-4 w-4 mr-2" />
              Content Manager
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos">
            <VideoManager />
          </TabsContent>

          <TabsContent value="users">
            <UserManager />
          </TabsContent>

          <TabsContent value="content">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Content Management System</CardTitle>
                <CardDescription className="text-gray-400">
                  Advanced content organization and publishing tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  Content management interface coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SystemDashboard;