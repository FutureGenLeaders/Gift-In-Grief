
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Subscribe from "./pages/Subscribe";
import BulkOrders from "./pages/BulkOrders";
import Sessions from "./pages/Sessions";
import Assessment from "./pages/Assessment";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import CreateSession from "./pages/CreateSession";
import MasterclassLibrary from "./pages/MasterclassLibrary";
import CommunityPage from "./pages/CommunityPage";
import AnnouncementBoard from "./pages/AnnouncementBoard";
import "./i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/bulk-orders" element={<BulkOrders />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-session" element={<CreateSession />} />
          <Route path="/masterclass" element={<MasterclassLibrary />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/announcements" element={<AnnouncementBoard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
