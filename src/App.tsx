
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Assessment from "./pages/Assessment";
import NotFound from "./pages/NotFound";
import Sessions from "@/pages/Sessions";
import CreateSession from "@/pages/CreateSession";
import Subscribe from "@/pages/Subscribe";
import ProfilePage from "@/pages/ProfilePage";
import MasterclassLibrary from "@/pages/MasterclassLibrary";
import CommunityPage from "@/pages/CommunityPage";
import "./i18n";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import AnnouncementBoardPage from "@/pages/AnnouncementBoard";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";

const queryClient = new QueryClient();

const App = () => {
  // Initialize push notifications on app load
  usePushNotifications();

  // Initialize mobile-specific features
  useEffect(() => {
    const initMobileFeatures = async () => {
      if (Capacitor.isNativePlatform()) {
        // Set status bar style
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#000000' });
        
        // Hide splash screen after app loads
        await SplashScreen.hide();
      }
    };

    initMobileFeatures();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/create-session" element={<CreateSession />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/masterclass" element={<MasterclassLibrary />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/announcements" element={<AnnouncementBoardPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
