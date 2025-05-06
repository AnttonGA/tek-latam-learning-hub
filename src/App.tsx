
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Nosotros from "./pages/Nosotros";
import ProgramDetail from "./pages/ProgramDetail";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Create a QueryClient instance
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/login" element={<Login />} />
              <Route path="/programa/:id" element={<ProgramDetail />} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              {/* Add more routes here as we develop them */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
