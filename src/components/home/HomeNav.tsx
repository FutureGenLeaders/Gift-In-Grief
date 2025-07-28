
import { Button } from "@/components/ui/button";
import { Compass, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function HomeNav() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  const handleWatchDemo = () => {
    // For now, navigate to the assessment
    navigate("/assessment");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="bg-black/80 backdrop-blur-sm border-b border-yellow-600/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Compass className="h-8 w-8 text-yellow-600" />
            <span className="text-2xl font-light bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent">
              {t("app.title")}
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/assessment" className="text-gray-300 hover:text-yellow-600 transition-colors font-light">
              {t("nav.discovery")}
            </Link>
            <Link to="/sessions" className="text-gray-300 hover:text-yellow-600 transition-colors font-light">
              Weekly Help
            </Link>
            <Link to="/masterclass" className="text-gray-300 hover:text-yellow-600 transition-colors font-light">
              Mindfulness Mentoring
            </Link>
            <Link to="/community" className="text-gray-300 hover:text-yellow-600 transition-colors font-light">
              {t("nav.community")}
            </Link>
            <Link to="/subscribe" className="text-yellow-500 hover:text-yellow-300 font-medium bg-gradient-to-r from-yellow-700/20 via-red-700/20 to-yellow-600/20 px-3 py-1 rounded">
              Membership
            </Link>
            <LanguageSelector />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10 font-light"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user.user_metadata?.display_name || user.email?.split('@')[0] || 'User'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-black/90 border-yellow-600/20 backdrop-blur-sm">
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/profile" 
                      className="text-gray-300 hover:text-yellow-600 transition-colors cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="text-gray-300 hover:text-yellow-600 transition-colors cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10 font-light"
                onClick={() => navigate("/auth")}
              >
                {t("nav.signin")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
