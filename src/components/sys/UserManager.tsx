import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  Search, 
  Filter,
  Eye,
  Calendar,
  Mail,
  Crown,
  User,
  CheckCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at?: string;
  // Mock data for display purposes
  full_name?: string;
  subscription_tier?: string;
  assessment_completed?: boolean;
}

const UserManager = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    activeSubscribers: 0,
    freeUsers: 0,
    newThisMonth: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, filterType]);

  const loadUsers = async () => {
    try {
      // Get auth users (this is a simplified approach - in reality you'd need proper admin access)
      // For now, we'll simulate user data since we can't directly query auth.users
      const simulatedUsers: UserData[] = [
        {
          id: "1",
          email: "user1@example.com",
          full_name: "Sarah Johnson",
          created_at: new Date().toISOString(),
          subscription_tier: "Guided Journey",
          assessment_completed: true,
          last_sign_in_at: new Date().toISOString()
        },
        {
          id: "2", 
          email: "user2@example.com",
          full_name: "Michael Chen",
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          subscription_tier: "Gentle Beginning",
          assessment_completed: true,
          last_sign_in_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: "3",
          email: "user3@example.com", 
          full_name: "Elena Rodriguez",
          created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          subscription_tier: "Sacred Transformation",
          assessment_completed: true,
          last_sign_in_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: "4",
          email: "user4@example.com",
          full_name: "David Kim",
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          subscription_tier: undefined,
          assessment_completed: false,
          last_sign_in_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];

      setUsers(simulatedUsers);

      // Calculate stats
      const activeSubscribers = simulatedUsers.filter(u => u.subscription_tier).length;
      const freeUsers = simulatedUsers.filter(u => !u.subscription_tier).length;
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const newThisMonth = simulatedUsers.filter(u => new Date(u.created_at) > monthAgo).length;

      setStats({
        activeSubscribers,
        freeUsers,
        newThisMonth
      });

    } catch (error) {
      console.error("Error loading users:", error);
      toast({
        title: "Error",
        description: "Failed to load user data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    switch (filterType) {
      case "subscribers":
        filtered = filtered.filter(user => user.subscription_tier);
        break;
      case "free":
        filtered = filtered.filter(user => !user.subscription_tier);
        break;
      case "all":
      default:
        break;
    }

    setFilteredUsers(filtered);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getSubscriptionBadge = (tier?: string) => {
    if (!tier) {
      return (
        <Badge variant="outline" className="border-gray-500 text-gray-400">
          <User className="h-3 w-3 mr-1" />
          Free User
        </Badge>
      );
    }

    const colors = {
      "Gentle Beginning": "bg-blue-600 text-white",
      "Guided Journey": "bg-yellow-600 text-black", 
      "Sacred Transformation": "bg-purple-600 text-white"
    };

    return (
      <Badge className={colors[tier as keyof typeof colors] || "bg-gray-600 text-white"}>
        <Crown className="h-3 w-3 mr-1" />
        {tier}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="py-12">
          <div className="text-center text-gray-500">Loading user data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Subscribers</CardTitle>
            <Crown className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.activeSubscribers}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Free Users</CardTitle>
            <User className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.freeUsers}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">New This Month</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.newThisMonth}</div>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">User Management</CardTitle>
              <CardDescription className="text-gray-400">
                View and manage registered users
              </CardDescription>
            </div>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="flex items-center space-x-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter users" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="subscribers">Active Subscribers</SelectItem>
                <SelectItem value="free">Free Users</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No users found matching your criteria.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-300">User</TableHead>
                  <TableHead className="text-gray-300">Subscription</TableHead>
                  <TableHead className="text-gray-300">Join Date</TableHead>
                  <TableHead className="text-gray-300">Assessment</TableHead>
                  <TableHead className="text-gray-300">Last Active</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-gray-800">
                    <TableCell>
                      <div>
                        <div className="font-medium text-white">
                          {user.full_name || "Unknown User"}
                        </div>
                        <div className="text-sm text-gray-400 flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      {getSubscriptionBadge(user.subscription_tier)}
                    </TableCell>
                    
                    <TableCell className="text-gray-300">
                      {formatDate(user.created_at)}
                    </TableCell>
                    
                    <TableCell>
                      {user.assessment_completed ? (
                        <Badge className="bg-green-600 text-white">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Complete
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-orange-500 text-orange-400">
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    
                    <TableCell className="text-gray-300">
                      {user.last_sign_in_at ? formatDate(user.last_sign_in_at) : "Never"}
                    </TableCell>
                    
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:text-white"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
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

export default UserManager;