import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Login from "@/pages/Login";
import TouristHome from "@/pages/tourist/TouristHome";
import ActivityDetails from "@/pages/tourist/ActivityDetails";
import Accommodation from "@/pages/tourist/Accommodation";
import TransportPage from "@/pages/tourist/TransportPage";
import Marketplace from "@/pages/tourist/Marketplace";
import MyBookings from "@/pages/tourist/MyBookings";
import MapPage from "@/pages/tourist/MapPage";
import BlogPage from "@/pages/tourist/BlogPage";
import BlogDetail from "@/pages/tourist/BlogDetail";
import Profile from "@/pages/tourist/Profile";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import LocationManager from "@/pages/admin/LocationManager";
import Navbar from "@/components/Navbar";
import HostDashboard from "@/pages/host/HostDashboard";
import AddActivity from "@/pages/host/AddActivity";
import ManageActivities from "@/pages/host/ManageActivities";
import AddProduct from "@/pages/host/AddProduct";
import AddBlogPost from "@/pages/host/AddBlogPost";
import Terms from "@/pages/Terms";
import Welcome from "@/pages/Welcome";
import VerifyEmail from "@/pages/auth/VerifyEmail";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main className="min-h-screen pb-24 lg:pb-0">{children}</main>
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

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        {/* Shared Protected Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/terms" element={<Terms />} />

        {/* Host Routes */}
        {user.role === "host" && (
          <>
            <Route path="/host" element={<HostDashboard />} />
            <Route path="/host/add-activity" element={<AddActivity />} />
            <Route path="/host/manage" element={<ManageActivities />} />
            <Route path="/host/add-blog" element={<AddBlogPost />} />
            <Route path="/host/add-product" element={<AddProduct />} />
            <Route path="*" element={<Navigate to="/host" replace />} />
          </>
        )}

        {/* Admin Routes */}
        {user.role === "superAdmin" && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/locations" element={<LocationManager />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </>
        )}

        {/* Tourist Routes */}
        {user.role === "tourist" && (
          <>
            <Route path="/" element={<TouristHome />} />
            <Route path="/activity/:id" element={<ActivityDetails />} />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/transport" element={<TransportPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <DataProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <AppRoutes />
            </BrowserRouter>
          </DataProvider>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
