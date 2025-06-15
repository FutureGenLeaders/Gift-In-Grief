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
import "./i18n";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import AnnouncementBoardPage from "@/pages/AnnouncementBoard";

const queryClient = new QueryClient();

const App = () => {
  // Initialize push notifications on app load
  usePushNotifications();

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
