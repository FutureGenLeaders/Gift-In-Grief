import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ADMIN_ACCESS_CODE = "GRIEF_ADMIN_2024_SECURE";

const SystemLogin = () => {
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (accessCode !== ADMIN_ACCESS_CODE) {
      setError("Invalid access code. Unauthorized access attempt logged.");
      setIsLoading(false);
      return;
    }

    try {
      // First check if this email exists in system_managers
      const { data: managerData, error: managerError } = await supabase
        .from("system_managers")
        .select("*")
        .eq("email", email)
        .eq("is_active", true)
        .maybeSingle();

      if (managerError || !managerData) {
        setError("Email not authorized for system access.");
        setIsLoading(false);
        return;
      }

      // Sign in the user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: accessCode, // Using access code as temporary password
      });

      if (signInError) {
        // If sign-in fails, try to sign up with the access code as password
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password: accessCode,
        });

        if (signUpError) {
          setError("Authentication failed. Contact system administrator.");
          setIsLoading(false);
          return;
        }
      }

      // Update last login time
      await supabase
        .from("system_managers")
        .update({ last_login: new Date().toISOString() })
        .eq("email", email);

      toast({
        title: "System Access Granted",
        description: "Welcome to the management panel.",
      });

      navigate("/admin/secure-management-panel");
    } catch (err) {
      console.error("Login error:", err);
      setError("System error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl font-light text-white">
            System Maintenance
          </CardTitle>
          <CardDescription className="text-gray-400">
            Authorized Personnel Only
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter authorized email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessCode" className="text-gray-300">
                System Access Code
              </Label>
              <Input
                id="accessCode"
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter access code"
              />
            </div>

            {error && (
              <Alert className="bg-red-900/50 border-red-700">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-300">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-medium"
            >
              {isLoading ? "Authenticating..." : "Access System"}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            Unauthorized access is prohibited and monitored.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemLogin;