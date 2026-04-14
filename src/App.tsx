import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/react";
import Index from "./pages/Index.tsx";
import FindTutors from "./pages/FindTutors.tsx";
import TutorProfile from "./pages/TutorProfile.tsx";
import BecomeTutor from "./pages/BecomeTutor.tsx";
import HowItWorks from "./pages/HowItWorks.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import NotFound from "./pages/NotFound.tsx";
import MyProfile from "./pages/MyProfile.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Clerk Auth Buttons - Fixed in top right */}
        <div className="fixed top-5 md:top-4 right-4 md:right-6 flex items-center gap-2 z-40">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">Log in</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="hero" size="sm">Sign up</Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton userProfileMode="navigation" userProfileUrl="/my-profile">
              <UserButton.MenuItems>
                <UserButton.Link 
                  label="My Profile" 
                  href="/my-profile" 
                  labelIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>} 
                />
              </UserButton.MenuItems>
            </UserButton>
          </Show>
        </div>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/find-tutors" element={<FindTutors />} />
          <Route path="/tutor/:id" element={<TutorProfile />} />
          <Route path="/become-tutor" element={<BecomeTutor />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
