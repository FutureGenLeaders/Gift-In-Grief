
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
    <nav className="bg-background/95 backdrop-blur-md border-b border-border shadow-subtle">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <Compass className="h-8 w-8 text-primary" />
            <span className="text-2xl font-playfair font-semibold luxury-heading">
              {t("app.title")}
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/assessment" className="luxury-text hover:text-primary transition-colors font-inter">
              {t("nav.discovery")}
            </Link>
            {user ? (
              <>
                <Link to="/sessions" className="luxury-text hover:text-primary transition-colors font-inter">
                  Weekly Help
                </Link>
                <Link to="/masterclass" className="luxury-text hover:text-primary transition-colors font-inter">
                  Mindfulness Mentoring
                </Link>
                <Link to="/community" className="luxury-text hover:text-primary transition-colors font-inter">
                  {t("nav.community")}
                </Link>
                <Link to="/subscribe" className="gold-text hover:text-accent font-medium bg-secondary/50 px-4 py-2 rounded-lg border border-border hover:border-primary transition-all">
                  Membership
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/assessment" 
                  state={{ 
                    from: { 
                      pathname: "/sessions", 
                      search: "", 
                      hash: "", 
                      state: null, 
                      key: "nav-sessions" 
                    } 
                  }} 
                  className="luxury-text hover:text-primary transition-colors font-inter"
                >
                  Weekly Help
                </Link>
                <Link 
                  to="/assessment" 
                  state={{ 
                    from: { 
                      pathname: "/masterclass", 
                      search: "", 
                      hash: "", 
                      state: null, 
                      key: "nav-masterclass" 
                    } 
                  }} 
                  className="luxury-text hover:text-primary transition-colors font-inter"
                >
                  Mindfulness Mentoring
                </Link>
                <Link 
                  to="/assessment" 
                  state={{ 
                    from: { 
                      pathname: "/community", 
                      search: "", 
                      hash: "", 
                      state: null, 
                      key: "nav-community" 
                    } 
                  }} 
                  className="luxury-text hover:text-primary transition-colors font-inter"
                >
                  {t("nav.community")}
                </Link>
                <Link 
                  to="/assessment" 
                  state={{ 
                    from: { 
                      pathname: "/subscribe", 
                      search: "", 
                      hash: "", 
                      state: null, 
                      key: "nav-subscribe" 
                    } 
                  }} 
                  className="gold-text hover:text-accent font-medium bg-secondary/50 px-4 py-2 rounded-lg border border-border hover:border-primary transition-all"
                >
                  Membership
                </Link>
              </>
            )}
            <LanguageSelector />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="border-border text-foreground hover:bg-secondary hover:border-primary font-inter"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user.user_metadata?.display_name || user.email?.split('@')[0] || 'User'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-popover border-border backdrop-blur-md shadow-luxury">
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/profile" 
                      className="text-popover-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="text-popover-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="luxury"
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
