import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Login from "@/pages/Login";
import TouristHome from "@/pages/tourist/TouristHome";
import ActivityDetails from "@/pages/tourist/ActivityDetails";
import Accommodation from "@/pages/tourist/Accommodation";
import TransportPage from "@/pages/tourist/TransportPage";
import Marketplace from "@/pages/tourist/Marketplace";
import MyBookings from "@/pages/tourist/MyBookings";
import HostDashboard from "@/pages/host/HostDashboard";
import AddActivity from "@/pages/host/AddActivity";
import ManageActivities from "@/pages/host/ManageActivities";
import AddProduct from "@/pages/host/AddProduct";
import TouristNav from "@/components/TouristNav";
import HostNav from "@/components/HostNav";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const TouristLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <TouristNav />
    {children}
  </>
);

const HostLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <HostNav />
    {children}
  </>
);

const AppRoutes = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Login />;

  if (user.role === "host") {
    return (
      <Routes>
        <Route path="/host" element={<HostLayout><HostDashboard /></HostLayout>} />
        <Route path="/host/add-activity" element={<HostLayout><AddActivity /></HostLayout>} />
        <Route path="/host/manage" element={<HostLayout><ManageActivities /></HostLayout>} />
        <Route path="/host/add-product" element={<HostLayout><AddProduct /></HostLayout>} />
        <Route path="*" element={<Navigate to="/host" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<TouristLayout><TouristHome /></TouristLayout>} />
      <Route path="/activity/:id" element={<TouristLayout><ActivityDetails /></TouristLayout>} />
      <Route path="/accommodation" element={<TouristLayout><Accommodation /></TouristLayout>} />
      <Route path="/transport" element={<TouristLayout><TransportPage /></TouristLayout>} />
      <Route path="/marketplace" element={<TouristLayout><Marketplace /></TouristLayout>} />
      <Route path="/my-bookings" element={<TouristLayout><MyBookings /></TouristLayout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <LanguageProvider>
        <AuthProvider>
          <DataProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </DataProvider>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
