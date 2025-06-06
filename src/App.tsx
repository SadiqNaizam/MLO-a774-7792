import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import newly generated pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AccountsDetailsPage from "./pages/AccountsDetailsPage";
import JointAccountApplicationPage from "./pages/JointAccountApplicationPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

// Placeholder for authentication status (in a real app, this would come from context/state)
const isAuthenticated = () => {
  // Replace with actual auth check, e.g., check for a token in localStorage
  // For this example, let's assume not authenticated by default to show login page first
  // return !!localStorage.getItem('authToken'); 
  return true; // For testing, assume authenticated to allow access to dashboard etc.
               // Change to false to test redirection to login.
};

// ProtectedRoute component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    // User not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }
  return children;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/accounts-details" element={<ProtectedRoute><AccountsDetailsPage /></ProtectedRoute>} />
          {/* Example for specific account ID, adjust as needed */}
          <Route path="/accounts-details/:accountId" element={<ProtectedRoute><AccountsDetailsPage /></ProtectedRoute>} /> 
          <Route path="/joint-account-application" element={<ProtectedRoute><JointAccountApplicationPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

          {/* Set index route: if authenticated go to dashboard, else to login */}
          <Route 
            path="/" 
            element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
          />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;