import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index.tsx";
import FindTutors from "./pages/FindTutors.tsx";
import TutorProfile from "./pages/TutorProfile.tsx";
import BecomeTutor from "./pages/BecomeTutor.tsx";
import HowItWorks from "./pages/HowItWorks.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Auth Buttons - Fixed in top right */}
        <div className="fixed top-5 md:top-4 right-4 md:right-6 flex items-center gap-2 z-40">
          <Link to="/login"><Button variant="ghost" size="sm" className="text-xs md:text-sm h-8 md:h-9 px-3 md:px-4">Log in</Button></Link>
          <Link to="/signup"><Button variant="hero" size="sm" className="text-xs md:text-sm h-8 md:h-9 px-3 md:px-4">Sign up</Button></Link>
        </div>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/find-tutors" element={<FindTutors />} />
          <Route path="/tutor/:id" element={<TutorProfile />} />
          <Route path="/become-tutor" element={<BecomeTutor />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
