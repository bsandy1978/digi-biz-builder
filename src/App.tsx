
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";
import ViewCard from "./pages/ViewCard";
import Admin from "./pages/Admin";
import ActivateNFC from "./pages/ActivateNFC";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/editor/:id" element={<Editor />} />
              <Route path="/card/:slug" element={<ViewCard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/activate-nfc" element={<ActivateNFC />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </TooltipProvider>
      </AuthProvider>
    </Router>
  </QueryClientProvider>
);

export default App;
