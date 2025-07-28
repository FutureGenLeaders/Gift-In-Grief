
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
import SystemLogin from "./pages/SystemLogin";
import SystemDashboard from "./pages/SystemDashboard";
import Auth from "./pages/Auth";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./i18n";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/subscribe" element={
                <ProtectedRoute>
                  <Subscribe />
                </ProtectedRoute>
              } />
              <Route path="/bulk-orders" element={
                <ProtectedRoute>
                  <BulkOrders />
                </ProtectedRoute>
              } />
              <Route path="/sessions" element={
                <ProtectedRoute>
                  <Sessions />
                </ProtectedRoute>
              } />
              <Route path="/assessment" element={
                <ProtectedRoute>
                  <Assessment />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/create-session" element={
                <ProtectedRoute>
                  <CreateSession />
                </ProtectedRoute>
              } />
              <Route path="/masterclass" element={
                <ProtectedRoute>
                  <MasterclassLibrary />
                </ProtectedRoute>
              } />
              <Route path="/community" element={
                <ProtectedRoute>
                  <CommunityPage />
                </ProtectedRoute>
              } />
              <Route path="/announcements" element={
                <ProtectedRoute>
                  <AnnouncementBoard />
                </ProtectedRoute>
              } />
              
              {/* Hidden Admin Routes - No public links anywhere */}
              <Route path="/admin/hidden-secure-portal-2024" element={<SystemLogin />} />
              <Route path="/admin/emergency-access-backup" element={<SystemLogin />} />
              <Route path="/admin/secure-management-panel" element={<SystemDashboard />} />
              <Route path="/admin/content-mgmt-sys" element={<SystemDashboard />} />
              <Route path="/admin/user-analytics-panel" element={<SystemDashboard />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
